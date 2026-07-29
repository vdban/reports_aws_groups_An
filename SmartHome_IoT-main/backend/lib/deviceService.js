const db = require('./db');
const { broadcast } = require('./sse');
const mqtt = require('./mqtt');

const state = {
  settings: { fanMode: 'manual', tempThreshold: 30, lightMode: 'manual', lightSchedule: { on: '18:00', off: '06:00' } },
  lastPomoAction: null,
  lastAutoFanStatus: null,
  lastAutoLightStatus: null,
  lastNotifyDoorStatus: 'closed',
};

async function loadSettings() {
  const doc = await db.get('SETTINGS', 'devices');
  if (doc) state.settings = doc;
}

function getSettings() {
  return state.settings;
}

function setSettings(next) {
  state.settings = next;
}

async function addCommand(device, status, note = 'Manual') {
  const ts = Date.now().toString();
  await db.put('CMD', `${device}#${ts}`, { device, status, note, timestamp: Date.now() });
  await db.put('STATE', device, { status, timestamp: Date.now(), note });

  if (device === 'light') {
    mqtt.publish('device/bbc-led', status === 'on' ? '1' : '0');
    broadcast('light', { status });
  } else if (device === 'fan') {
    mqtt.publish('device/bbc-fan', status === 'on' ? '1' : '0');
    broadcast('fan', { status });
  } else if (device === 'door') {
    await db.put('DOOR_EVENT', ts, { status, timestamp: Date.now() });
    await db.put('STATE', 'door', { status, lastChanged: Date.now() });
    broadcast('door', { status, lastChanged: Date.now() });
    broadcast('door_events', {});
  }
}

async function handlePomodoroChange(data) {
  let currentAction = 'RESET';
  if (data.isRunning) {
    if (data.endTime && data.endTime > Date.now()) {
      currentAction = data.type === 'focus' ? 'START_FOCUS' : 'START_BREAK';
    }
  } else if (data.endTime) {
    currentAction = 'PAUSE';
  }

  if (currentAction === state.lastPomoAction) return;
  const prevAction = state.lastPomoAction;
  state.lastPomoAction = currentAction;

  let payload = 'RESET';
  if (currentAction === 'START_FOCUS') {
    payload = prevAction === 'PAUSE' ? 'RESUME' : `START:${data.duration || 25}`;
  } else if (currentAction === 'START_BREAK') {
    payload = prevAction === 'PAUSE' ? 'RESUME' : `START:${data.duration || 5}`;
  } else if (currentAction === 'PAUSE') {
    payload = 'PAUSE';
  }
  mqtt.publish('device/pomodoro-control', payload);
  broadcast('pomodoro', data);
}

function checkSchedule(nowStr, onTime, offTime) {
  if (onTime < offTime) return nowStr >= onTime && nowStr < offTime;
  return nowStr >= onTime || nowStr < offTime;
}

async function runSystemLoop(simulateDoor) {
  try {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const sensors = (await db.get('STATE', 'sensors')) || {};
    const temp = sensors.temperature ?? 25;
    const hum = sensors.humidity ?? 60;

    let currentDoorStatus = (await db.get('STATE', 'door'))?.status || 'closed';
    if (simulateDoor) {
      currentDoorStatus = Math.random() > 0.8 ? 'open' : 'closed';
    }

    if (currentDoorStatus !== state.lastNotifyDoorStatus) {
      const id = Date.now().toString();
      await db.put('NOTIFICATION', id, {
        title: currentDoorStatus === 'open' ? 'doorOpened' : 'doorClosed',
        message: currentDoorStatus === 'open' ? 'doorOpenedAt' : 'doorClosedAt',
        type: 'door',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
        timestamp: Date.now(),
      });
      await db.put('DOOR_EVENT', id, { status: currentDoorStatus, timestamp: Date.now() });
      await db.put('STATE', 'door', { status: currentDoorStatus, lastChanged: Date.now() });
      broadcast('notifications', {});
      broadcast('door', { status: currentDoorStatus });
      state.lastNotifyDoorStatus = currentDoorStatus;
    }

    if (state.settings.fanMode === 'auto') {
      const threshold = state.settings.tempThreshold || 30;
      const newStatus = temp > threshold ? 'on' : 'off';
      if (newStatus !== state.lastAutoFanStatus) {
        await addCommand('fan', newStatus, `Auto (Threshold: ${threshold}°C)`);
        state.lastAutoFanStatus = newStatus;
      }
    }

    if (state.settings.lightMode === 'auto' && state.settings.lightSchedule) {
      const { on, off } = state.settings.lightSchedule;
      const newStatus = checkSchedule(currentTimeStr, on, off) ? 'on' : 'off';
      if (newStatus !== state.lastAutoLightStatus) {
        await addCommand('light', newStatus, 'Auto by Schedule');
        state.lastAutoLightStatus = newStatus;
      }
    }

    console.log(`🌡️ ${temp}°C | 💧 ${hum}% | 🚪 ${currentDoorStatus} | 🌀 ${state.lastAutoFanStatus || 'off'}`);
  } catch (error) {
    console.error('❌ System loop error:', error);
  }
}

module.exports = {
  loadSettings,
  getSettings,
  setSettings,
  addCommand,
  handlePomodoroChange,
  runSystemLoop,
};
