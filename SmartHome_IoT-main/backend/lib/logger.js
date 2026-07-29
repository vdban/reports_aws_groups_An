const {
  CloudWatchLogsClient,
  CreateLogGroupCommand,
  CreateLogStreamCommand,
  PutLogEventsCommand,
  DescribeLogStreamsCommand,
} = require('@aws-sdk/client-cloudwatch-logs');

const AUDIT_LOG_GROUP = process.env.CLOUDWATCH_LOG_GROUP || '/smarthome/audit';
const APP_LOG_GROUP = process.env.CLOUDWATCH_APP_LOG_GROUP || '/smarthome/app';
const LOG_STREAM = process.env.CLOUDWATCH_LOG_STREAM || `backend-${process.env.HOSTNAME || 'local'}`;
const REGION = process.env.AWS_REGION || 'ap-southeast-2';
const ENABLED = process.env.CLOUDWATCH_ENABLED === 'true';

const clients = {};
const sequenceTokens = {};
const initialized = {};

async function ensureLogGroupAndStream(logGroupName) {
  if (!ENABLED || initialized[logGroupName]) return;
  if (!clients[logGroupName]) {
    clients[logGroupName] = new CloudWatchLogsClient({ region: REGION });
  }
  const client = clients[logGroupName];
  try {
    await client.send(new CreateLogGroupCommand({ logGroupName }));
  } catch (err) {
    if (err.name !== 'ResourceAlreadyExistsException') throw err;
  }
  try {
    await client.send(new CreateLogStreamCommand({ logGroupName, logStreamName: LOG_STREAM }));
  } catch (err) {
    if (err.name !== 'ResourceAlreadyExistsException') throw err;
  }
  const streams = await client.send(new DescribeLogStreamsCommand({
    logGroupName,
    logStreamNamePrefix: LOG_STREAM,
  }));
  sequenceTokens[logGroupName] = streams.logStreams?.[0]?.uploadSequenceToken || null;
  initialized[logGroupName] = true;
}

async function sendLog(logGroupName, payload) {
  if (!ENABLED) return;
  try {
    await ensureLogGroupAndStream(logGroupName);
    const client = clients[logGroupName];
    const params = {
      logGroupName,
      logStreamName: LOG_STREAM,
      logEvents: [{
        message: JSON.stringify(payload),
        timestamp: Date.now(),
      }],
      sequenceToken: sequenceTokens[logGroupName] || undefined,
    };
    const res = await client.send(new PutLogEventsCommand(params));
    sequenceTokens[logGroupName] = res.nextSequenceToken;
  } catch (err) {
    console.error(`[CloudWatch ${logGroupName}]`, err.message);
  }
}

async function logToCloudWatch(payload) {
  const entry = { ...payload, timestamp: payload.timestamp || new Date().toISOString() };
  console.log('[AUDIT]', JSON.stringify(entry));
  await sendLog(AUDIT_LOG_GROUP, entry);
}

async function logAppEvent(payload) {
  const entry = { ...payload, timestamp: payload.timestamp || new Date().toISOString() };
  console.log('[APP]', JSON.stringify(entry));
  await sendLog(APP_LOG_GROUP, entry);
}

module.exports = { logToCloudWatch, logAppEvent };
