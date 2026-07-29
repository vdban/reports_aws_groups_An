const path = require('path');
const db = require('./db');
const { broadcast } = require('./sse');

let client = null;

function initMqtt(enabled) {
  if (!enabled) {
    console.log('⚠️ MQTT disabled (set MQTT_ENABLED=true and add certs to enable)');
    return;
  }

  const certDir = path.join(__dirname, '..', 'certs');
  const keyPath = path.join(certDir, 'private.pem.key');
  if (!require('fs').existsSync(keyPath)) {
    console.log('⚠️ AWS IoT certs not found in backend/certs/ — MQTT skipped');
    return;
  }

  const awsIot = require('aws-iot-device-sdk');
  client = awsIot.device({
    keyPath,
    certPath: path.join(certDir, 'device.pem.crt'),
    caPath: path.join(certDir, 'root-CA.crt'),
    clientId: process.env.IOT_CLIENT_ID || 'YoloHomeBackend',
    host: process.env.IOT_ENDPOINT || 'xxxxx-ats.iot.ap-southeast-2.amazonaws.com',
  });

  client.on('connect', () => {
    console.log('🟢 Connected to AWS IoT Core MQTT');
    ['device/bbc-temp', 'device/bbc-humi', 'device/bbc-light', 'device/bbc-led'].forEach((t) => {
      client.subscribe(t);
    });
  });

  client.on('message', async (topic, message) => {
    const payload = message.toString().trim();
    console.log(`📩 MQTT [${topic}]: ${payload}`);
    try {
      if (topic.endsWith('bbc-temp')) {
        const value = parseInt(payload, 10);
        if (isNaN(value)) return;
        const cur = (await db.get('STATE', 'sensors')) || {};
        await db.put('STATE', 'sensors', { ...cur, temperature: value, timestamp: Date.now() });
        broadcast('sensors', { temperature: value, humidity: cur.humidity, light: cur.light });
      } else if (topic.endsWith('bbc-humi')) {
        const value = parseInt(payload, 10);
        if (isNaN(value)) return;
        const cur = (await db.get('STATE', 'sensors')) || {};
        await db.put('STATE', 'sensors', { ...cur, humidity: value, timestamp: Date.now() });
        broadcast('sensors', { temperature: cur.temperature, humidity: value, light: cur.light });
      } else if (topic.endsWith('bbc-light')) {
        const value = parseInt(payload, 10);
        if (isNaN(value)) return;
        const cur = (await db.get('STATE', 'sensors')) || {};
        await db.put('STATE', 'sensors', { ...cur, light: value, timestamp: Date.now() });
        broadcast('sensors', { temperature: cur.temperature, humidity: cur.humidity, light: value });
      } else if (topic.endsWith('bbc-led')) {
        const status = payload === '1' ? 'on' : 'off';
        const cur = await db.get('STATE', 'light');
        if (cur?.status !== status) {
          await db.put('STATE', 'light', { status, timestamp: Date.now(), note: 'Synced from IoT' });
          broadcast('light', { status });
        }
      }
    } catch (err) {
      console.error('❌ MQTT handler error:', err);
    }
  });

  client.on('error', (err) => console.error('❌ MQTT error:', err));
}

function publish(topic, payload) {
  if (client?.connected) {
    client.publish(topic, payload, { qos: 1 });
    console.log(`📤 MQTT publish ${topic}: ${payload}`);
  }
}

function isConnected() {
  return !!client?.connected;
}

module.exports = { initMqtt, publish, isConnected };
