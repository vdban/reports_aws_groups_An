/**
 * Virtual ESP32 — chạy trên EC2 (hoặc local) thay thế phần cứng Yolo UNO.
 * Mô phỏng DHT11, LDR, LED, Quạt, Pomodoro qua AWS IoT Core MQTT.
 *
 * Chế độ:
 *   MQTT  — cần backend/certs-device/ (cert Thing YoloUNODevice)
 *   HTTP  — dev local, gửi trực tiếp tới backend (ALLOW_DEV_SIMULATOR=true)
 */
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const path = require('path');
const fs = require('fs');

const MODE = process.env.SIMULATOR_MODE || 'auto'; // auto | mqtt | http
const IOT_ENDPOINT = process.env.IOT_ENDPOINT || 'xxxxx-ats.iot.ap-southeast-2.amazonaws.com';
const IOT_CLIENT_ID = process.env.IOT_DEVICE_CLIENT_ID || 'YoloUNODevice';
const BACKEND_URL = process.env.SIMULATOR_BACKEND_URL || 'http://localhost:5000';

const TOPICS = {
  TEMP: 'device/bbc-temp',
  HUMI: 'device/bbc-humi',
  LIGHT: 'device/bbc-light',
  LED: 'device/bbc-led',
  FAN: 'device/bbc-fan',
  TEMP_REQ: 'device/bbc-temp-req',
  POMO_CONTROL: 'device/pomodoro-control',
  POMO_STATUS: 'device/pomodoro-status',
};

const state = {
  temperature: 28,
  humidity: 62,
  light: 45,
  led: false,
  fan: false,
  pomodoro: 'IDLE',
};

function randBetween(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function getCertDir() {
  return process.env.IOT_DEVICE_CERT_DIR || path.join(__dirname, 'certs-device');
}

function hasMqttCerts() {
  const dir = getCertDir();
  return ['private.pem.key', 'device.pem.crt', 'root-CA.crt'].every(
    (f) => fs.existsSync(path.join(dir, f))
  );
}

function resolveMode() {
  if (MODE === 'mqtt') return 'mqtt';
  if (MODE === 'http') return 'http';
  return hasMqttCerts() ? 'mqtt' : 'http';
}

async function publishHttpTelemetry() {
  try {
    await fetch(`${BACKEND_URL}/api/dev/telemetry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        temperature: state.temperature,
        humidity: state.humidity,
        light: state.light,
      }),
    });
  } catch (err) {
    console.error('[HTTP] Telemetry failed:', err.message);
  }
}

function tickSensors() {
  state.temperature = randBetween(26, 34);
  state.humidity = randBetween(55, 75);
  state.light = randBetween(10, 90);
}

function startMqttSimulator() {
  const awsIot = require('aws-iot-device-sdk');
  const certDir = getCertDir();

  const client = awsIot.device({
    keyPath: path.join(certDir, 'private.pem.key'),
    certPath: path.join(certDir, 'device.pem.crt'),
    caPath: path.join(certDir, 'root-CA.crt'),
    clientId: IOT_CLIENT_ID,
    host: IOT_ENDPOINT,
  });

  function publish(topic, payload) {
    if (client.connected) {
      client.publish(topic, String(payload), { qos: 1 });
      console.log(`📤 [MQTT] ${topic} → ${payload}`);
    }
  }

  function publishSensors() {
    tickSensors();
    publish(TOPICS.TEMP, state.temperature);
    publish(TOPICS.HUMI, state.humidity);
    publish(TOPICS.LIGHT, state.light);
  }

  client.on('connect', () => {
    console.log('🟢 Virtual ESP32 connected to AWS IoT Core');
    [TOPICS.POMO_CONTROL, TOPICS.LED, TOPICS.TEMP_REQ, TOPICS.FAN].forEach((t) => {
      client.subscribe(t);
    });
    publishSensors();
  });

  client.on('message', (topic, message) => {
    const payload = message.toString().trim();
    console.log(`📩 [MQTT] ${topic}: ${payload}`);

    if (topic.endsWith('bbc-led')) {
      state.led = payload === '1';
      console.log(`💡 LED: ${state.led ? 'ON' : 'OFF'}`);
      publish(TOPICS.LED, state.led ? '1' : '0');
    } else if (topic.endsWith('bbc-fan')) {
      state.fan = payload === '1';
      console.log(`🌀 FAN: ${state.fan ? 'ON' : 'OFF'}`);
    } else if (topic.endsWith('bbc-temp-req')) {
      tickSensors();
      publish(TOPICS.TEMP, state.temperature);
      publish(TOPICS.HUMI, state.humidity);
      console.log('🌡️ Immediate sensor read');
    } else if (topic.endsWith('pomodoro-control')) {
      state.pomodoro = payload;
      console.log(`⏳ Pomodoro cmd: ${payload}`);
      publish(TOPICS.POMO_STATUS, `STATUS:${payload}`);
    }
  });

  client.on('error', (err) => console.error('❌ MQTT error:', err));

  setInterval(publishSensors, 30000);
  setInterval(() => {
    state.light = randBetween(10, 90);
    publish(TOPICS.LIGHT, state.light);
  }, 15000);

  console.log('========================================');
  console.log('  🤖 VIRTUAL ESP32 (MQTT mode)');
  console.log(`  Client: ${IOT_CLIENT_ID}`);
  console.log(`  Endpoint: ${IOT_ENDPOINT}`);
  console.log('========================================');
}

function startHttpSimulator() {
  console.log('========================================');
  console.log('  🤖 VIRTUAL ESP32 (HTTP dev mode)');
  console.log(`  Backend: ${BACKEND_URL}`);
  console.log('  (Không cần cert IoT — dùng /api/dev/telemetry)');
  console.log('========================================');

  tickSensors();
  publishHttpTelemetry();

  setInterval(() => {
    tickSensors();
    publishHttpTelemetry();
  }, 15000);
}

const mode = resolveMode();
console.log(`Starting simulator in ${mode.toUpperCase()} mode...`);

if (mode === 'mqtt') {
  startMqttSimulator();
} else {
  startHttpSimulator();
}
