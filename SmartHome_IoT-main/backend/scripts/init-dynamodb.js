require('dotenv').config();
const { DynamoDBClient, CreateTableCommand, DescribeTableCommand } = require('@aws-sdk/client-dynamodb');

const TABLE = process.env.DYNAMODB_TABLE || 'SmartHome';
const REGION = process.env.AWS_REGION || 'ap-southeast-2';

async function main() {
  const client = new DynamoDBClient({ region: REGION });

  try {
    await client.send(new DescribeTableCommand({ TableName: TABLE }));
    console.log(`✅ Table "${TABLE}" already exists`);
    return;
  } catch (err) {
    if (err.name !== 'ResourceNotFoundException') throw err;
  }

  await client.send(new CreateTableCommand({
    TableName: TABLE,
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: [
      { AttributeName: 'pk', AttributeType: 'S' },
      { AttributeName: 'sk', AttributeType: 'S' },
    ],
    KeySchema: [
      { AttributeName: 'pk', KeyType: 'HASH' },
      { AttributeName: 'sk', KeyType: 'RANGE' },
    ],
  }));

  console.log(`✅ Created DynamoDB table "${TABLE}" (pay-per-request, ~$0 khi ít dùng)`);
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
