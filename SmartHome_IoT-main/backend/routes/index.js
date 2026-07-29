const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../lib/db');
const home = require('../lib/home');
const { logToCloudWatch } = require('../lib/logger');
const { addClient, broadcast } = require('../lib/sse');
const mqtt = require('../lib/mqtt');
const deviceService = require('../lib/deviceService');

const authLib = require('../lib/auth');
const cognito = require('../lib/cognito');

function registerRoutes(app, {
  jwtSecret,
  allowPublicRegister,
  simulateDoor,
}) {
  const auth = authLib.createAuthMiddleware(jwtSecret);
  const optionalAuth = authLib.createOptionalAuth(jwtSecret);

  app.get('/api/events', optionalAuth, (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    addClient(res);
    res.write(`event: connected\ndata: ${JSON.stringify({ ok: true })}\n\n`);
  });

  app.get('/api/state', optionalAuth, async (_req, res) => {
    try {
      const [sensors, light, fan, door, devices, pomodoro] = await Promise.all([
        db.get('STATE', 'sensors'),
        db.get('STATE', 'light'),
        db.get('STATE', 'fan'),
        db.get('STATE', 'door'),
        db.get('SETTINGS', 'devices'),
        db.get('SETTINGS', 'pomodoro'),
      ]);
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const doorEvents = await db.query('DOOR_EVENT', { limit: 10 });
      const todayOpens = (await db.query('DOOR_EVENT', { limit: 100 }))
        .filter((e) => e.status === 'open' && e.timestamp >= todayStart.getTime()).length;
      const notifications = await db.query('NOTIFICATION', { limit: 20 });
      const pomoHistory = (await db.query('POMO_HISTORY', { limit: 100 }))
        .filter((h) => h.type === 'focus' && h.timestamp >= todayStart.getTime());

      res.json({
        sensorData: {
          temperature: sensors?.temperature ?? 0,
          humidity: sensors?.humidity ?? 0,
          light: sensors?.light ?? 0,
        },
        lightOn: light?.status === 'on',
        fanOn: fan?.status === 'on',
        doorOpen: door?.status === 'open',
        lastActivity: door?.lastChanged
          ? new Date(door.lastChanged).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : '--:--',
        doorLogs: doorEvents.map((e) => ({
          id: e.sk,
          status: e.status,
          action: e.status === 'open' ? 'doorOpened' : 'doorClosed',
          time: new Date(e.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        })),
        todayOpens,
        deviceSettings: devices || deviceService.getSettings(),
        pomodoro: pomodoro || { isRunning: false, endTime: null, type: 'focus', duration: 25 },
        notifications: notifications.map((n) => ({
          id: n.sk,
          title: n.title,
          message: n.message,
          type: n.type,
          time: n.time,
          read: n.read,
        })),
        pomodoroStats: {
          sessions: pomoHistory.length,
          minutes: pomoHistory.reduce((s, h) => s + (h.duration || 0), 0),
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to load state' });
    }
  });

  app.get('/api/auth/config', (_req, res) => {
    res.json({
      cognitoEnabled: cognito.isEnabled(),
      userPoolId: cognito.isEnabled() ? cognito.USER_POOL_ID : null,
      clientId: cognito.isEnabled() ? cognito.CLIENT_ID : null,
    });
  });

  app.get('/api/auth/me', auth, async (req, res) => {
    try {
      if (cognito.isEnabled()) {
        return res.json({
          success: true,
          user: {
            username: req.user.username,
            displayName: req.user.displayName || req.user.username,
            role: req.user.role,
          },
        });
      }
      const user = await db.get('USER', req.user.username);
      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
      res.json({
        success: true,
        user: { username: user.username, displayName: user.displayName, role: user.role },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Lỗi xác thực' });
    }
  });

  app.post('/api/logout', auth, async (req, res) => {
    try {
      await home.recordLogout(req.user.username);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.json({ success: true });
    }
  });

  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const clientIp = req.ip || '127.0.0.1';

    if (!username?.trim() || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập tài khoản và mật khẩu' });
    }

    const name = username.trim();
    try {
      if (cognito.isEnabled()) {
        const result = await cognito.login(name, password);
        await home.recordLogin(result.user.username, result.user.role);
        await logToCloudWatch({ event: 'LOGIN_SUCCESS', username: result.user.username, ip: clientIp, auth: 'cognito' });
        return res.json({ success: true, token: result.token, user: result.user });
      }

      const user = await db.get('USER', name);
      if (!user) {
        await logToCloudWatch({ event: 'LOGIN_FAILED', username: name, ip: clientIp });
        return res.status(400).json({ success: false, message: 'Tài khoản hoặc mật khẩu không đúng!' });
      }
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        await logToCloudWatch({ event: 'LOGIN_FAILED', username: name, reason: 'wrong password', ip: clientIp });
        return res.status(400).json({ success: false, message: 'Tài khoản hoặc mật khẩu không đúng!' });
      }
      const token = jwt.sign({ username: user.username, role: user.role }, jwtSecret, { expiresIn: '7d' });
      await home.recordLogin(user.username, user.role);
      await logToCloudWatch({ event: 'LOGIN_SUCCESS', username: user.username, ip: clientIp });
      res.json({
        success: true,
        token,
        user: { username: user.username, displayName: user.displayName, role: user.role },
      });
    } catch (err) {
      console.error(err);
      await logToCloudWatch({ event: 'LOGIN_FAILED', username: name, ip: clientIp, error: err.message });
      const message = err.code === 'NEW_PASSWORD_REQUIRED'
        ? err.message
        : 'Tài khoản hoặc mật khẩu không đúng!';
      res.status(400).json({ success: false, message });
    }
  });

  app.post('/api/register', async (req, res) => {
    if (!allowPublicRegister) {
      return res.status(403).json({ success: false, message: 'Đăng ký công khai đã tắt. Liên hệ admin.' });
    }
    const { username, password, displayName } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Thiếu thông tin đăng ký' });
    }
    if (username === 'admin') {
      return res.status(400).json({ success: false, message: 'Tên tài khoản không hợp lệ' });
    }
    try {
      if (cognito.isEnabled()) {
        await cognito.createUser({ username, password, displayName: displayName || username, role: 'user' });
        return res.json({ success: true, message: 'Đăng ký thành công!' });
      }
      const existing = await db.get('USER', username);
      if (existing) {
        return res.status(400).json({ success: false, message: 'Tài khoản đã tồn tại' });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      await db.put('USER', username, {
        username, displayName: displayName || username,
        role: 'user', passwordHash, createdAt: Date.now(),
      });
      res.json({ success: true, message: 'Đăng ký thành công!' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, message: err.message || 'Đăng ký thất bại' });
    }
  });

  app.get('/api/users', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Không có quyền' });
    }
    try {
      const users = cognito.isEnabled() ? await cognito.listUsers() : await db.listUsers();
      res.json({ success: true, users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Lỗi tải danh sách user' });
    }
  });

  app.post('/api/users/add', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Không có quyền' });
    }
    const { username, password, displayName, role } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Thiếu thông tin' });
    }
    if (username === 'admin') {
      return res.status(400).json({ success: false, message: 'Tài khoản đã tồn tại' });
    }
    try {
      if (cognito.isEnabled()) {
        await cognito.createUser({
          username, password, displayName: displayName || username,
          role: role === 'admin' ? 'admin' : 'user',
        });
      } else {
        const existing = await db.get('USER', username);
        if (existing) {
          return res.status(400).json({ success: false, message: 'Tài khoản đã tồn tại' });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        await db.put('USER', username, {
          username, displayName, role: role === 'admin' ? 'admin' : 'user',
          passwordHash, createdAt: Date.now(),
        });
      }
      await logToCloudWatch({
        event: 'USER_CREATED',
        createdBy: req.user.username,
        targetUser: username,
        targetRole: role === 'admin' ? 'admin' : 'user',
        ip: req.ip,
      });
      res.json({ success: true, message: 'Đã thêm tài khoản' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, message: err.message || 'Thêm user thất bại' });
    }
  });

  app.delete('/api/users/delete/:username', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Không có quyền' });
    }
    const { username } = req.params;
    if (username === 'admin') {
      return res.status(403).json({ success: false, message: 'Không thể xóa admin gốc' });
    }
    try {
      if (cognito.isEnabled()) {
        await cognito.deleteUser(username);
      } else {
        const target = await db.get('USER', username);
        if (!target) {
          return res.status(404).json({ success: false, message: 'Tài khoản không tồn tại' });
        }
        await db.remove('USER', username);
      }
      await logToCloudWatch({
        event: 'USER_DELETED',
        deletedBy: req.user.username,
        targetUser: username,
        ip: req.ip,
      });
      res.json({ success: true, message: 'Đã xóa tài khoản' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, message: err.message || 'Xóa user thất bại' });
    }
  });

  app.patch('/api/users/:username', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Không có quyền' });
    }
    const { username } = req.params;
    const { displayName, password, role } = req.body;
    try {
      if (cognito.isEnabled()) {
        await cognito.updateUser(username, { displayName, password, role });
      } else {
        const target = await db.get('USER', username);
        if (!target) {
          return res.status(404).json({ success: false, message: 'Tài khoản không tồn tại' });
        }
        const updated = { ...target };
        if (displayName) updated.displayName = displayName;
        if (role === 'admin' || role === 'user') updated.role = role;
        if (password && password.length >= 6) {
          updated.passwordHash = await bcrypt.hash(password, 10);
        }
        await db.put('USER', username, updated);
      }
      res.json({ success: true, message: 'Đã cập nhật tài khoản' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, message: err.message || 'Cập nhật thất bại' });
    }
  });

  app.put('/api/auth/password', auth, async (req, res) => {
    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Mật khẩu phải >= 6 ký tự' });
    }
    try {
      if (cognito.isEnabled()) {
        await cognito.updateUser(req.user.username, { password });
      } else {
        const user = await db.get('USER', req.user.username);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        await db.put('USER', req.user.username, {
          ...user,
          passwordHash: await bcrypt.hash(password, 10),
        });
      }
      res.json({ success: true, message: 'Đổi mật khẩu thành công' });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message || 'Đổi mật khẩu thất bại' });
    }
  });

  app.delete('/api/auth/account', auth, async (req, res) => {
    if (req.user.username === 'admin') {
      return res.status(403).json({ success: false, message: 'Không thể xóa admin' });
    }
    try {
      if (cognito.isEnabled()) {
        await cognito.deleteUser(req.user.username);
      } else {
        await db.remove('USER', req.user.username);
      }
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message || 'Xóa tài khoản thất bại' });
    }
  });

  app.get('/api/home', auth, async (_req, res) => {
    try {
      res.json(await home.getHomeSnapshot());
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to load home data' });
    }
  });

  app.post('/api/home/devices/:id/toggle', auth, async (req, res) => {
    try {
      const data = await home.toggleDevice(req.params.id, req.user.username, deviceService.addCommand);
      broadcast('home', {});
      res.json({ success: true, ...data });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, message: err.message || 'Toggle failed' });
    }
  });

  app.patch('/api/home/devices/:id', auth, async (req, res) => {
    try {
      const data = await home.updateVirtualDevice(req.params.id, req.body, req.user.username);
      broadcast('home', {});
      res.json({ success: true, ...data });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, message: err.message || 'Update failed' });
    }
  });

  app.post('/api/commands/:device', auth, async (req, res) => {
    const { device } = req.params;
    const { status, note } = req.body;
    if (!['light', 'fan', 'door'].includes(device)) {
      return res.status(400).json({ error: 'Invalid device' });
    }
    await deviceService.addCommand(device, status, note || 'Manual Toggle');
    res.json({ success: true });
  });

  app.post('/api/commands/measure', auth, async (_req, res) => {
    mqtt.publish('device/bbc-temp-req', '1');
    res.json({ success: true });
  });

  app.put('/api/settings/devices', auth, async (req, res) => {
    const cur = (await db.get('SETTINGS', 'devices')) || {};
    const updated = { ...cur, ...req.body };
    await db.put('SETTINGS', 'devices', updated);
    deviceService.setSettings(updated);
    broadcast('devices', updated);
    res.json({ success: true, data: updated });
  });

  app.put('/api/settings/pomodoro', auth, async (req, res) => {
    const cur = (await db.get('SETTINGS', 'pomodoro')) || {};
    const updated = { ...cur, ...req.body };
    await db.put('SETTINGS', 'pomodoro', updated);
    await deviceService.handlePomodoroChange(updated);
    res.json({ success: true, data: updated });
  });

  app.post('/api/pomodoro/history', auth, async (req, res) => {
    const { type, duration } = req.body;
    const id = Date.now().toString();
    await db.put('POMO_HISTORY', id, { type, duration, timestamp: Date.now() });
    broadcast('pomodoro_stats', {});
    res.json({ success: true });
  });

  app.patch('/api/notifications/:id/read', auth, async (req, res) => {
    const item = await db.get('NOTIFICATION', req.params.id);
    if (item) await db.put('NOTIFICATION', req.params.id, { ...item, read: true });
    res.json({ success: true });
  });

  app.delete('/api/notifications/:id', auth, async (req, res) => {
    await db.remove('NOTIFICATION', req.params.id);
    broadcast('notifications', {});
    res.json({ success: true });
  });

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      db: db.useLocal() ? 'local' : 'dynamodb',
      auth: cognito.isEnabled() ? 'cognito' : 'local-jwt',
      mqtt: mqtt.isConnected(),
      devSimulator: process.env.ALLOW_DEV_SIMULATOR === 'true',
    });
  });

  if (process.env.ALLOW_DEV_SIMULATOR === 'true') {
    app.post('/api/dev/telemetry', async (req, res) => {
      const { temperature, humidity, light } = req.body;
      try {
        const cur = (await db.get('STATE', 'sensors')) || {};
        const updated = {
          ...cur,
          temperature: temperature ?? cur.temperature ?? 25,
          humidity: humidity ?? cur.humidity ?? 60,
          light: light ?? cur.light ?? 0,
          timestamp: Date.now(),
        };
        await db.put('STATE', 'sensors', updated);
        broadcast('sensors', {
          temperature: updated.temperature,
          humidity: updated.humidity,
          light: updated.light,
        });
        res.json({ success: true, data: updated });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
      }
    });
    console.log('🤖 Dev simulator API enabled: POST /api/dev/telemetry');
  }
}

module.exports = { registerRoutes };
