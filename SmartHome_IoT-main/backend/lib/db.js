require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const fs = require('fs');
const path = require('path');

const TABLE = process.env.DYNAMODB_TABLE || 'SmartHome';
const LOCAL_DB = process.env.USE_LOCAL_DB === 'true';
const LOCAL_PATH = path.join(__dirname, '..', 'data', 'local-db.json');

let docClient = null;

function initDynamoClient() {
  if (LOCAL_DB || docClient) return docClient;
  try {
    const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
    const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION || 'ap-southeast-2',
    });
    docClient = DynamoDBDocumentClient.from(client, {
      marshallOptions: { removeUndefinedValues: true },
    });
    return docClient;
  } catch (err) {
    console.warn('⚠️ DynamoDB client unavailable, using local file store:', err.message);
    return null;
  }
}

function loadLocal() {
  try {
    if (fs.existsSync(LOCAL_PATH)) {
      return JSON.parse(fs.readFileSync(LOCAL_PATH, 'utf8'));
    }
  } catch (_) {}
  return { items: [] };
}

function saveLocal(data) {
  const dir = path.dirname(LOCAL_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(LOCAL_PATH, JSON.stringify(data, null, 2));
}

function useLocal() {
  return LOCAL_DB || !initDynamoClient();
}

async function get(pk, sk) {
  if (useLocal()) {
    const db = loadLocal();
    return db.items.find((i) => i.pk === pk && i.sk === sk) || null;
  }
  const { GetCommand } = require('@aws-sdk/lib-dynamodb');
  const res = await docClient.send(new GetCommand({ TableName: TABLE, Key: { pk, sk } }));
  return res.Item || null;
}

async function put(pk, sk, data) {
  const item = { pk, sk, ...data, updatedAt: Date.now() };
  if (useLocal()) {
    const db = loadLocal();
    const idx = db.items.findIndex((i) => i.pk === pk && i.sk === sk);
    if (idx >= 0) db.items[idx] = item;
    else db.items.push(item);
    saveLocal(db);
    return item;
  }
  const { PutCommand } = require('@aws-sdk/lib-dynamodb');
  await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
  return item;
}

async function remove(pk, sk) {
  if (useLocal()) {
    const db = loadLocal();
    db.items = db.items.filter((i) => !(i.pk === pk && i.sk === sk));
    saveLocal(db);
    return;
  }
  const { DeleteCommand } = require('@aws-sdk/lib-dynamodb');
  await docClient.send(new DeleteCommand({ TableName: TABLE, Key: { pk, sk } }));
}

async function query(pk, { limit = 50, desc = true, skMin = null } = {}) {
  if (useLocal()) {
    let items = loadLocal().items.filter((i) => i.pk === pk);
    if (skMin) items = items.filter((i) => i.sk >= skMin);
    items.sort((a, b) => (desc ? b.sk.localeCompare(a.sk) : a.sk.localeCompare(b.sk)));
    return items.slice(0, limit);
  }
  const { QueryCommand } = require('@aws-sdk/lib-dynamodb');
  const params = {
    TableName: TABLE,
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: { ':pk': pk },
    ScanIndexForward: !desc,
    Limit: limit,
  };
  if (skMin) {
    params.KeyConditionExpression += ' AND sk >= :skMin';
    params.ExpressionAttributeValues[':skMin'] = skMin;
  }
  const res = await docClient.send(new QueryCommand(params));
  return res.Items || [];
}

async function initDefaults() {
  const defaults = [
    { pk: 'STATE', sk: 'sensors', temperature: 25, humidity: 60, light: 0 },
    { pk: 'STATE', sk: 'light', status: 'off' },
    { pk: 'STATE', sk: 'fan', status: 'off' },
    { pk: 'STATE', sk: 'door', status: 'closed', lastChanged: Date.now() },
    {
      pk: 'SETTINGS', sk: 'devices',
      fanMode: 'manual', tempThreshold: 30,
      lightMode: 'manual', lightSchedule: { on: '18:00', off: '06:00' },
    },
    { pk: 'SETTINGS', sk: 'pomodoro', isRunning: false, endTime: null, type: 'focus', duration: 25 },
  ];
  for (const d of defaults) {
    const existing = await get(d.pk, d.sk);
    if (!existing) await put(d.pk, d.sk, d);
  }

  const admin = await get('USER', 'admin');
  if (!admin) {
    const bcrypt = require('bcryptjs');
    await put('USER', 'admin', {
      username: 'admin',
      displayName: 'Nguyễn Văn Admin',
      role: 'admin',
      passwordHash: await bcrypt.hash('admin123', 10),
      createdAt: Date.now(),
    });
  }
  console.log(`📦 Database ready (${useLocal() ? 'local file' : 'DynamoDB'}: ${TABLE})`);
}

async function listUsers() {
  const items = await query('USER', { limit: 200, desc: false });
  return items.map(({ passwordHash, pk, sk, updatedAt, ...rest }) => rest);
}

module.exports = { get, put, remove, query, listUsers, initDefaults, useLocal, TABLE };
