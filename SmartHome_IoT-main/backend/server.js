require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const db = require('./lib/db');
const mqtt = require('./lib/mqtt');
const deviceService = require('./lib/deviceService');
const { registerRoutes } = require('./routes');

const JWT_SECRET = process.env.JWT_SECRET || 'smarthome-dev-secret-change-in-production';
const API_PORT = process.env.PORT || 5000;
const MQTT_ENABLED = process.env.MQTT_ENABLED !== 'false';
const ALLOW_PUBLIC_REGISTER = process.env.ALLOW_PUBLIC_REGISTER === 'true';
const SIMULATE_DOOR = process.env.SIMULATE_DOOR === 'true';

const COGNITO_ENABLED = process.env.COGNITO_ENABLED === 'true';

if (process.env.NODE_ENV === 'production' && !COGNITO_ENABLED && JWT_SECRET.includes('dev-secret')) {
  console.error('❌ Set COGNITO_ENABLED=true or a strong JWT_SECRET in production!');
  process.exit(1);
}

const app = express();
app.set('trust proxy', 1);
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

registerRoutes(app, {
  jwtSecret: JWT_SECRET,
  allowPublicRegister: ALLOW_PUBLIC_REGISTER,
  simulateDoor: SIMULATE_DOOR,
});

async function start() {
  await db.initDefaults();
  await deviceService.loadSettings();

  setInterval(async () => {
    const pomo = await db.get('SETTINGS', 'pomodoro');
    if (pomo) await deviceService.handlePomodoroChange(pomo);
  }, 2000);

  mqtt.initMqtt(MQTT_ENABLED);
  setInterval(() => deviceService.runSystemLoop(SIMULATE_DOOR), 20000);

  app.listen(API_PORT, () => {
    console.log('=========================================');
    console.log('   🏠 SMART HOME AWS BACKEND');
    console.log(`   API: http://localhost:${API_PORT}`);
    console.log(`   Auth: ${COGNITO_ENABLED ? 'Cognito' : 'Local JWT'}`);
    console.log(`   DB:  ${db.useLocal() ? 'Local file (dev)' : `DynamoDB (${db.TABLE})`}`);
    console.log('=========================================');
  });
}

start().catch(console.error);
