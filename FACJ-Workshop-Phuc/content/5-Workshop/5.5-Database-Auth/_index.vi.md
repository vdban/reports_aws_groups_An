---
title: "Cơ sở dữ liệu & Xác thực"
date: 2026-07-01
weight: 5
chapter: false
pre: " <b> 5.5. </b> "
---

# Cơ sở dữ liệu & xác thực (AWS)

### Dữ liệu — Amazon RDS
Các bảng tiêu biểu:
- `sensor_readings` — nhiệt độ / độ ẩm / ánh sáng
- `device_commands` — lệnh light / fan / door / sensor
- `door_events` — nhật ký an ninh
- `notifications` — thông báo
- `settings` — cấu hình devices + pomodoro

Đặt RDS ở **private subnet**; chỉ mở cho Security Group của EC2.

### Auth — Amazon Cognito
- User Pool đăng nhập email/social cho dashboard
- App client cấu hình cho frontend React host trên S3

### Mục con
- [Mô hình RDS](5.5.1-dynamodb-setup/)
- [Thiết lập Cognito](5.5.2-cognito-setup/)
