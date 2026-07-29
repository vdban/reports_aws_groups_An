/**
 * Trích xuất AWS cert từ code/secrets.h → backend/certs-device/
 * Chạy: node scripts/extract-device-certs.js
 */
const fs = require('fs');
const path = require('path');

const secretsPath = path.join(__dirname, '../../code/secrets.h');
const outDir = path.join(__dirname, '../certs-device');

if (!fs.existsSync(secretsPath)) {
  console.error('❌ Không tìm thấy code/secrets.h');
  process.exit(1);
}

const content = fs.readFileSync(secretsPath, 'utf8');

function extractBlock(varName) {
  const re = new RegExp(`const char ${varName}\\[\\] PROGMEM = R"EOF\\(([\\s\\S]*?)\\)EOF"`, 'm');
  const m = content.match(re);
  if (!m) throw new Error(`Không tìm thấy ${varName} trong secrets.h`);
  return m[1].trim() + '\n';
}

function extractEndpoint() {
  const m = content.match(/AWS_ENDPOINT\[\]\s*=\s*"([^"]+)"/);
  return m ? m[1] : null;
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, 'root-CA.crt'), extractBlock('AWS_CA'));
fs.writeFileSync(path.join(outDir, 'device.pem.crt'), extractBlock('AWS_CERT'));
fs.writeFileSync(path.join(outDir, 'private.pem.key'), extractBlock('AWS_KEY'));

const endpoint = extractEndpoint();
console.log('✅ Đã ghi cert vào backend/certs-device/');
console.log('   ├── root-CA.crt');
console.log('   ├── device.pem.crt');
console.log('   └── private.pem.key');
if (endpoint) {
  console.log(`\n📡 IOT_ENDPOINT=${endpoint}`);
  console.log('   Thêm vào backend/.env nếu chưa có.');
}
