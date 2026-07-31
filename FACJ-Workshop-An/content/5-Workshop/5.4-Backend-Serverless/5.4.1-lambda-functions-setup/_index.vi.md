---
title: "Chạy backend trên EC2"
date: 2026-07-01
weight: 1
chapter: false
pre: " <b> 5.4.1. </b> "
---

# Deploy `server.js` lên Amazon EC2 (AWS)

### Các bước
1. Launch EC2 trong **VPC** lab, SG cho SSH + port app.
2. Gắn **IAM Role for EC2** (S3, CloudWatch, IoT tùy nhu cầu — không để access key).
3. SSH, cài Node.js, clone SmartHome_IoT, `cd backend && npm install`.
4. Cấu hình `.env` cho endpoint **RDS** và **AWS IoT Core**/cert.
5. Chạy: `node server.js` (dùng `pm2`/systemd khi demo lâu).

### Kiểm tra
- Backend kết nối IoT Core và RDS.
- Topic cảm biến cập nhật DB; lệnh publish ngược về thiết bị.
