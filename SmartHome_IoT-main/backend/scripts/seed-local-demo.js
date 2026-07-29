/**
 * Tạo tài khoản demo local (USE_LOCAL_DB=true)
 * Chạy: node scripts/seed-local-demo.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const bcrypt = require('bcryptjs');
const db = require('../lib/db');

const DEMO_USERS = [
  { username: 'admin',  password: 'admin123',  displayName: 'Quản Trị Viên', role: 'admin' },
  { username: 'user1',  password: 'user1123',   displayName: 'Người Dùng 1',  role: 'user'  },
  { username: 'user2',  password: 'user2123',   displayName: 'Người Dùng 2',  role: 'user'  },
];

(async () => {
  for (const u of DEMO_USERS) {
    const existing = await db.get('USER', u.username);
    if (existing) {
      console.log(`⚠️  ${u.username} đã tồn tại — cập nhật mật khẩu + role`);
    }
    const passwordHash = await bcrypt.hash(u.password, 10);
    await db.put('USER', u.username, {
      username: u.username,
      displayName: u.displayName,
      role: u.role,
      passwordHash,
      createdAt: existing?.createdAt ?? Date.now(),
    });
    console.log(`✅  ${u.username.padEnd(8)} / ${u.password.padEnd(12)}  [${u.role}]  — ${u.displayName}`);
  }

  console.log('\n==============================');
  console.log('  Demo accounts (local dev)');
  console.log('==============================');
  console.log('  admin  / admin123   [admin]');
  console.log('  user1  / user1123   [user]');
  console.log('  user2  / user2123   [user]');
  console.log('==============================');
  console.log('\nMở http://localhost:5173 để đăng nhập.');
})();
