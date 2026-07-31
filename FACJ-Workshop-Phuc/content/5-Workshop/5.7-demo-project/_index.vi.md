---
title: "Demo"
date: 2026-07-01
weight: 7
chapter: false
pre: " <b> 5.7. </b> "
---

# Checklist demo SmartHome_IoT (AWS)

### Trình diễn
1. Dashboard trên **S3** với đăng nhập **Cognito**
2. Dữ liệu realtime: **IoT Core** → backend EC2 → **RDS**
3. Bật/tắt đèn/quạt; xem log IoT Core / backend
4. Kiến trúc: ESP32 → IoT Core → EC2 → RDS / S3
5. AWS Console: VPC, EC2+Role, S3, RDS, IoT Core, Cognito, CloudWatch, Budgets

### Link
Xem [Tài liệu tham khảo](../../8-References/) cho GitHub, video demo và ghi chú hạ tầng AWS.

### Lệnh mẫu
```bash
# Build frontend → S3
npm run build
aws s3 sync dist/ s3://your-smarthome-ui --delete

# Backend trên EC2
cd backend && node server.js
```
