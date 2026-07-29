#!/bin/bash
# Chạy TRÊN EC2 sau khi upload backend code vào /opt/smarthome/backend
# Usage: bash /opt/smarthome/infrastructure/scripts/ec2-setup.sh
set -e

BACKEND_DIR="/opt/smarthome/backend"
INFRA_DIR="/opt/smarthome/infrastructure"

echo "=== SmartHome EC2 Setup ==="

# ── 1. Kiểm tra .env ──────────────────────────────────────────────
if [ ! -f "$BACKEND_DIR/.env" ]; then
  cat "$BACKEND_DIR/.env.example" > "$BACKEND_DIR/.env" 2>/dev/null || true
  echo "⚠️  Chưa có .env — đã copy từ .env.example"
  echo "   Sửa: nano $BACKEND_DIR/.env"
  echo "   Rồi chạy lại script này"
  exit 1
fi

# ── 2. Cài dependencies ───────────────────────────────────────────
echo "📦 npm install..."
cd "$BACKEND_DIR"
npm install --omit=dev --silent

# ── 3. Cài PM2 nếu chưa có ───────────────────────────────────────
if ! command -v pm2 &>/dev/null; then
  echo "📦 Installing PM2..."
  npm install -g pm2 --silent
fi

# ── 4. Dừng systemd service (do CloudFormation UserData tạo) ─────
echo "🔧 Dừng systemd smarthome service (nếu có)..."
sudo systemctl stop smarthome 2>/dev/null || true
sudo systemctl disable smarthome 2>/dev/null || true

# ── 5. Cấu hình nginx ─────────────────────────────────────────────
mkdir -p /opt/smarthome/dist
if [ -f "$INFRA_DIR/nginx/smarthome.conf" ]; then
  sudo cp "$INFRA_DIR/nginx/smarthome.conf" /etc/nginx/conf.d/smarthome.conf
  # Xóa default config nếu có (tránh conflict port 80)
  sudo rm -f /etc/nginx/conf.d/default.conf /etc/nginx/default.d/welcome.conf 2>/dev/null || true
  sudo nginx -t && sudo systemctl reload nginx
  echo "✅ Nginx configured"
else
  echo "⚠️  Không tìm thấy nginx config — dùng config mặc định"
fi

# ── 6. Xóa PM2 processes cũ, start lại ───────────────────────────
echo "🚀 Khởi động PM2 processes..."
pm2 delete smarthome-backend 2>/dev/null || true
pm2 delete virtual-esp32 2>/dev/null || true

if [ -d "$BACKEND_DIR/certs-device" ] && [ -f "$BACKEND_DIR/certs-device/private.pem.key" ]; then
  echo "✅ Có certs-device → start backend + virtual ESP32 (MQTT mode)"
  pm2 start "$BACKEND_DIR/ecosystem.config.cjs" --env production
else
  echo "⚠️  Không có certs-device → chỉ start backend"
  pm2 start "$BACKEND_DIR/ecosystem.config.cjs" --env production --only smarthome-backend
fi

# ── 7. Lưu PM2 config, tự khởi động khi reboot ───────────────────
pm2 save
pm2 startup systemd -u ec2-user --hp /home/ec2-user 2>/dev/null | grep "sudo" | bash || true

# ── 8. Kết quả ───────────────────────────────────────────────────
echo ""
echo "=============================="
echo "  PM2 Status"
echo "=============================="
pm2 status
echo ""
echo "Test API:"
sleep 2
curl -s http://localhost:5000/api/health || echo "(backend đang khởi động, thử lại sau 5s)"
echo ""
echo "Test Nginx:"
curl -s http://localhost/api/health | head -c 100 || echo "(nginx chưa sẵn sàng)"
