/**
 * Smart Home catalog & view model — maps IoT state (light/fan/door/sensors)
 * onto the smart_home UI structure (rooms, devices, logs, power).
 */
const db = require('./db');

const ROOMS = [
  { id: 'r1', nameVi: 'Nhà Bếp', floor: 1, hasCamera: true, occupied: true },
  { id: 'r2', nameVi: 'Phòng Khách', floor: 1, hasCamera: true, occupied: true },
  { id: 'r3', nameVi: 'Phòng Ngủ 1', floor: 1, hasCamera: false, occupied: false },
  { id: 'r4', nameVi: 'Phòng Vệ Sinh Lớn', floor: 1, hasCamera: false, occupied: false },
  { id: 'r5', nameVi: 'Phòng Ngủ 2', floor: 2, hasCamera: false, occupied: true },
  { id: 'r6', nameVi: 'WC Nhỏ 2', floor: 2, hasCamera: false, occupied: false },
  { id: 'r9', nameVi: 'Phòng Giặt Đồ', floor: 3, hasCamera: false, occupied: false },
  { id: 'r10', nameVi: 'Ban Công', floor: 3, hasCamera: true, occupied: false },
];

/** iotKey links to real ESP32/backend STATE (light | fan | door) */
const DEVICE_CATALOG = [
  { id: 'd1', type: 'light', name: 'Đèn Nhà Bếp', roomId: 'r1', powerWatts: 15 },
  { id: 'd2', type: 'stove', name: 'Bếp Điện', roomId: 'r1', powerWatts: 2000 },
  { id: 'd3', type: 'dishwasher', name: 'Máy Rửa Chén', roomId: 'r1', powerWatts: 1200 },
  { id: 'd4', type: 'fridge', name: 'Tủ Lạnh', roomId: 'r1', powerWatts: 150, fridgeLevel: 3, fridgeMode: 'cold' },
  { id: 'd5', type: 'camera', name: 'Camera Nhà Bếp', roomId: 'r1', powerWatts: 8, defaultStatus: 'on' },
  { id: 'd6', type: 'light', name: 'Đèn Phòng Khách', roomId: 'r2', powerWatts: 24, iotKey: 'light' },
  { id: 'd7', type: 'ac', name: 'Máy Lạnh', roomId: 'r2', powerWatts: 1500, syncTemp: true },
  { id: 'd8', type: 'tv', name: 'TV Phòng Khách', roomId: 'r2', powerWatts: 120 },
  { id: 'd9', type: 'fan', name: 'Quạt Phòng Khách', roomId: 'r2', powerWatts: 50, iotKey: 'fan' },
  { id: 'd10', type: 'camera', name: 'Camera Phòng Khách', roomId: 'r2', powerWatts: 8, defaultStatus: 'on' },
  { id: 'd11', type: 'floor_cleaner', name: 'Máy VS Sàn', roomId: 'r2', powerWatts: 30 },
  { id: 'd12', type: 'light', name: 'Đèn Phòng Ngủ 1', roomId: 'r3', powerWatts: 12 },
  { id: 'd13', type: 'ac', name: 'Máy Lạnh PN1', roomId: 'r3', powerWatts: 1200, syncTemp: true },
  { id: 'd14', type: 'fan', name: 'Quạt PN1', roomId: 'r3', powerWatts: 40 },
  { id: 'd15', type: 'door', name: 'Cửa Tự Động PN1', roomId: 'r3', powerWatts: 20, iotKey: 'door' },
  { id: 'd16', type: 'light', name: 'Đèn WC Lớn', roomId: 'r4', powerWatts: 10 },
  { id: 'd17', type: 'floor_cleaner', name: 'Máy VS Sàn WC', roomId: 'r4', powerWatts: 30, defaultStatus: 'unknown' },
  { id: 'd18', type: 'light', name: 'Đèn Phòng Ngủ 2', roomId: 'r5', powerWatts: 12 },
  { id: 'd19', type: 'ac', name: 'Máy Lạnh PN2', roomId: 'r5', powerWatts: 1200, syncTemp: true },
  { id: 'd20', type: 'tv', name: 'TV PN2', roomId: 'r5', powerWatts: 80 },
  { id: 'd21', type: 'door', name: 'Cửa Tự Động PN2', roomId: 'r5', powerWatts: 20 },
  { id: 'd22', type: 'light', name: 'Đèn WC 2', roomId: 'r6', powerWatts: 10 },
  { id: 'd27', type: 'light', name: 'Đèn Phòng Giặt', roomId: 'r9', powerWatts: 10 },
  { id: 'd28', type: 'washer', name: 'Máy Giặt', roomId: 'r9', powerWatts: 800 },
  { id: 'd29', type: 'light', name: 'Đèn Ban Công', roomId: 'r10', powerWatts: 15 },
  { id: 'd30', type: 'camera', name: 'Camera Ban Công', roomId: 'r10', powerWatts: 8, defaultStatus: 'on' },
];

function formatLogTime(ts = Date.now()) {
  const d = new Date(ts);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formatLoginTime(ts = Date.now()) {
  const d = new Date(ts);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function iotToDeviceStatus(iotKey, stateVal) {
  if (iotKey === 'door') return stateVal === 'open' ? 'on' : 'off';
  return stateVal === 'on' ? 'on' : 'off';
}

async function addActivityLog({ deviceName, roomName, action, by }) {
  const ts = Date.now().toString();
  await db.put('ACTIVITY', ts, {
    deviceName,
    roomName,
    action,
    by,
    time: formatLogTime(),
    timestamp: Date.now(),
  });
  return ts;
}

async function recordLogin(username, role) {
  const ts = Date.now().toString();
  await db.put('LOGIN', ts, {
    username,
    role,
    loginTime: formatLoginTime(),
    timestamp: Date.now(),
  });
}

async function recordLogout(username) {
  const sessions = await db.query('LOGIN', { limit: 20 });
  const open = sessions.find((s) => s.username === username && !s.logoutTime);
  if (open) {
    await db.put('LOGIN', open.sk, {
      ...open,
      logoutTime: formatLoginTime(),
    });
  }
}

async function buildDevices() {
  const [sensors, light, fan, door] = await Promise.all([
    db.get('STATE', 'sensors'),
    db.get('STATE', 'light'),
    db.get('STATE', 'fan'),
    db.get('STATE', 'door'),
  ]);
  const temp = sensors?.temperature ?? 25;

  const devices = [];
  for (const cat of DEVICE_CATALOG) {
    let status = cat.defaultStatus || 'off';
    let runBy;
    let temperature = cat.syncTemp ? temp : undefined;

    let fridgeLevel = cat.fridgeLevel;
    let fridgeMode = cat.fridgeMode;

    if (cat.iotKey === 'light') {
      status = iotToDeviceStatus('light', light?.status);
      runBy = light?.note?.includes('Auto') ? 'auto' : undefined;
    } else if (cat.iotKey === 'fan') {
      status = iotToDeviceStatus('fan', fan?.status);
      runBy = fan?.note?.includes('Auto') ? 'auto' : undefined;
    } else if (cat.iotKey === 'door') {
      status = iotToDeviceStatus('door', door?.status);
    } else {
      const saved = await db.get('VDEVICE', cat.id);
      if (saved) {
        status = saved.status || status;
        runBy = saved.runBy;
        if (saved.temperature != null) temperature = saved.temperature;
        if (saved.fridgeLevel != null) fridgeLevel = saved.fridgeLevel;
        if (saved.fridgeMode != null) fridgeMode = saved.fridgeMode;
      } else if (cat.defaultStatus) {
        status = cat.defaultStatus;
        if (cat.type === 'camera') runBy = 'auto';
      }
    }

    devices.push({
      id: cat.id,
      type: cat.type,
      name: cat.name,
      roomId: cat.roomId,
      status,
      powerWatts: cat.powerWatts,
      temperature,
      fridgeLevel,
      fridgeMode,
      runBy,
      iotKey: cat.iotKey || null,
    });
  }
  return devices;
}

async function getActivityLogs(limit = 50) {
  const items = await db.query('ACTIVITY', { limit });
  return items.map((l) => ({
    id: l.sk,
    deviceName: l.deviceName,
    roomName: l.roomName,
    action: l.action,
    by: l.by,
    time: l.time,
  }));
}

async function getLoginHistory(limit = 30) {
  const items = await db.query('LOGIN', { limit });
  return items.map((l) => ({
    username: l.username,
    role: l.role,
    loginTime: l.loginTime,
    logoutTime: l.logoutTime,
  }));
}

function buildPowerStats(devices) {
  const running = devices.filter((d) => d.status === 'on');
  const wattsNow = running.reduce((s, d) => s + d.powerWatts, 0);
  const hourFactor = wattsNow / 1000;

  const daily = [
    { t: '00h', kwh: +(0.15 + hourFactor * 0.1).toFixed(2) },
    { t: '02h', kwh: 0.1 },
    { t: '04h', kwh: 0.12 },
    { t: '06h', kwh: +(0.5 + hourFactor * 0.3).toFixed(2) },
    { t: '08h', kwh: +(1.2 + hourFactor * 0.8).toFixed(2) },
    { t: '10h', kwh: +(1.0 + hourFactor * 0.7).toFixed(2) },
    { t: '12h', kwh: +(1.5 + hourFactor).toFixed(2) },
    { t: '14h', kwh: +(1.3 + hourFactor * 0.9).toFixed(2) },
    { t: '16h', kwh: +(1.1 + hourFactor * 0.8).toFixed(2) },
    { t: '18h', kwh: +(2.0 + hourFactor * 1.1).toFixed(2) },
    { t: '20h', kwh: +(1.8 + hourFactor).toFixed(2) },
    { t: '22h', kwh: +(0.8 + hourFactor * 0.4).toFixed(2) },
  ];

  const weekly = [
    { d: 'T2', kwh: 18.5 }, { d: 'T3', kwh: 21.2 }, { d: 'T4', kwh: 19.8 },
    { d: 'T5', kwh: 22.4 }, { d: 'T6', kwh: 24.1 }, { d: 'T7', kwh: 28.5 }, { d: 'CN', kwh: 26.3 },
  ];

  const monthly = Array.from({ length: 30 }, (_, i) => ({
    d: `${i + 1}/7`,
    curr: +(15 + Math.sin(i * 0.3) * 5 + hourFactor * 2).toFixed(1),
    prev: +(12 + Math.sin(i * 0.3) * 4).toFixed(1),
  }));

  return { daily, weekly, monthly, wattsNow, runningCount: running.length };
}

async function getHomeSnapshot() {
  const devices = await buildDevices();
  const [logs, loginHistory, sensors] = await Promise.all([
    getActivityLogs(),
    getLoginHistory(),
    db.get('STATE', 'sensors'),
  ]);

  const rooms = ROOMS.map((r) => {
    const rDevs = devices.filter((d) => d.roomId === r.id);
    const hasRunning = rDevs.some((d) => d.status === 'on');
    return {
      ...r,
      occupied: r.id === 'r3' ? devices.find((d) => d.id === 'd15')?.status === 'on' || r.occupied : hasRunning || r.occupied,
    };
  });

  return {
    rooms,
    devices,
    logs,
    loginHistory,
    sensors: {
      temperature: sensors?.temperature ?? 0,
      humidity: sensors?.humidity ?? 0,
      light: sensors?.light ?? 0,
    },
    power: buildPowerStats(devices),
  };
}

async function toggleDevice(deviceId, username, addCommand) {
  const cat = DEVICE_CATALOG.find((d) => d.id === deviceId);
  if (!cat) throw new Error('Device not found');

  const room = ROOMS.find((r) => r.id === cat.roomId);
  const devices = await buildDevices();
  const current = devices.find((d) => d.id === deviceId);
  if (!current) throw new Error('Device not found');
  if (current.status === 'error' || current.status === 'unknown') {
    throw new Error('Device unavailable');
  }

  const newOn = current.status !== 'on';
  const action = newOn ? 'on' : 'off';

  if (cat.iotKey === 'light') {
    await addCommand('light', newOn ? 'on' : 'off', `Manual · ${username}`);
  } else if (cat.iotKey === 'fan') {
    await addCommand('fan', newOn ? 'on' : 'off', `Manual · ${username}`);
  } else if (cat.iotKey === 'door') {
    await addCommand('door', newOn ? 'open' : 'closed', `Manual · ${username}`);
  } else {
    await db.put('VDEVICE', deviceId, {
      status: newOn ? 'on' : 'off',
      runBy: username,
      timestamp: Date.now(),
    });
  }

  await addActivityLog({
    deviceName: cat.name,
    roomName: room?.nameVi || '',
    action,
    by: username,
  });

  return getHomeSnapshot();
}

async function updateVirtualDevice(deviceId, patch, username) {
  const cat = DEVICE_CATALOG.find((d) => d.id === deviceId);
  if (!cat || cat.iotKey) throw new Error('Cannot patch IoT device settings this way');

  const saved = (await db.get('VDEVICE', deviceId)) || {};
  await db.put('VDEVICE', deviceId, { ...saved, ...patch, runBy: username, timestamp: Date.now() });
  return getHomeSnapshot();
}

module.exports = {
  ROOMS,
  DEVICE_CATALOG,
  getHomeSnapshot,
  toggleDevice,
  updateVirtualDevice,
  addActivityLog,
  recordLogin,
  recordLogout,
  buildDevices,
};
