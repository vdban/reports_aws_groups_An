---
title: "Workshop"
date: 2026-07-01
weight: 5
chapter: false
pre: " <b> 5. </b> "
---

# Workshop — Triển khai SmartHome_IoT lên AWS

Workshop này ghi lại **quy trình deploy dự án SmartHome_IoT** lên AWS, dựa trên README dự án và mã nguồn trong thư mục `SmartHome_IoT-main/`. Trọng tâm là thao tác trên **AWS Management Console**, kèm **đường dẫn ảnh minh họa** — bạn chụp screenshot và đặt file vào `content/images/workshop/`.

## Kiến trúc triển khai

```
[Browser] ──HTTP:80──► EC2 (Nginx)
                         ├─ /        → React SPA (/opt/smarthome/dist)
                         ├─ /api/*   → Node.js :5000 (PM2)
                         └─ virtual-esp32 (PM2, MQTT)
                                    │
                          DynamoDB · Cognito · IoT Core · CloudWatch
```

| Dịch vụ AWS | Vai trò |
|-------------|---------|
| **EC2 + Nginx** | Host frontend React, proxy `/api` → backend Node.js |
| **DynamoDB** | Lưu sensor, settings, logs, lịch sử đăng nhập |
| **Cognito** | Đăng nhập production, nhóm `admin` / `user` |
| **IoT Core** | MQTT backend ↔ virtual ESP32 / ESP32 thật |
| **CloudWatch** | Audit log, app log, dashboard, alarm login fail |

**Region khuyến nghị:** `ap-southeast-2` (Sydney).

## Mục lục

| Bước | Nội dung |
|------|----------|
| [5.1 Giới thiệu](5.1-introduction/) | Tổng quan dự án, stack, luồng deploy |
| [5.2 Chuẩn bị AWS](5.2-prerequisites/) | Region, IAM, VPC, EC2 Key Pair |
| [5.3 AWS IoT Core](5.3-iot-core/) | Policy, Thing, Certificate, Endpoint |
| [5.4 CloudFormation](5.4-cloudformation/) | Deploy stack hạ tầng (EC2, DynamoDB, Cognito, CloudWatch) |
| [5.5 Kiểm tra hạ tầng](5.5-verify-infrastructure/) | Xác nhận tài nguyên trên Console |
| [5.6 Deploy ứng dụng](5.6-deploy-application/) | Cấu hình `.env`, upload code lên EC2, Nginx + PM2 |
| [5.7 Tài khoản Cognito](5.7-cognito-users/) | Tạo user demo `admin`, `user1`, `user2` |
| [5.8 Kiểm tra & Demo](5.8-verification-demo/) | Health check, đăng nhập, điều khiển thiết bị |
| [5.9 ESP32 thật (tuỳ chọn)](5.9-optional-esp32/) | Flash firmware, dùng cert device |
| [5.10 Dọn dẹp & xử lý lỗi](5.10-cleanup-troubleshooting/) | Xóa stack, reset, bảng troubleshooting |

## Checklist deploy hoàn chỉnh

```
□ Chọn region ap-southeast-2
□ Tạo EC2 Key Pair → lưu .pem (không commit Git)
□ Kiểm tra default VPC + public subnet
□ IoT Core: Policy + 2 Things + cert → backend/certs/ + certs-device/
□ Lấy IoT endpoint
□ CloudFormation: deploy smarthome-stack → ghi Outputs
□ Sửa infrastructure/ec2.env.template
□ deploy-all.ps1 hoặc upload thủ công lên EC2
□ curl http://EC2_IP/api/health → ok
□ Tạo user Cognito demo
□ Mở http://EC2_IP → login admin / Admin@Demo2024
□ Test điều khiển đèn/quạt/cửa
□ pm2 logs virtual-esp32 → MQTT connected
```

