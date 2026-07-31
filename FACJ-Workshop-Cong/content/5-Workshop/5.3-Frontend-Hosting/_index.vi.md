---
title: "Host Frontend"
date: 2026-07-01
weight: 3
chapter: false
pre: " <b> 5.3. </b> "
---

# Host Frontend SmartHome_IoT

Giao diện SmartHome_IoT là app **React + Vite** (dashboard, auth, điều khiển thiết bị).

### Chạy local
```bash
cd SmartHome_IoT
npm install
npm run dev
```
Mở `http://localhost:5173`.

### Build production
```bash
npm run build
```
Output nằm trong `dist/` (hoặc thư mục build của project).

### Phương án AWS
1. **Amazon S3** static website hosting (xem mục tiếp theo)
2. Serve file build trên cùng **EC2** với backend (lab đơn giản)

### Trang liên quan
- [Host tĩnh trên S3](5.3.1-s3-cloudfront/)
- [Cấu hình bảo mật](5.3.2-security-configuration/)
