---
title: "MQTT & AWS IoT Core"
date: 2026-07-01
weight: 2
chapter: false
pre: " <b> 5.4.2. </b> "
---

# Messaging thiết bị với AWS IoT Core

Thiết bị và backend SmartHome_IoT giao tiếp qua **MQTT trên AWS IoT Core** (hạ tầng AWS).

### Topic mẫu
- `smarthome/sensors/temperature`
- `smarthome/sensors/humidity`
- `smarthome/sensors/light`
- `smarthome/commands/light`
- `smarthome/commands/fan`
- `smarthome/commands/pomodoro`

### Luồng
1. ESP32 publish cảm biến → **AWS IoT Core**
2. Backend trên EC2 nhận message → ghi **RDS**
3. UI/rule tạo lệnh → backend publish lên IoT Core
4. ESP32 thực thi lệnh

Đăng ký Thing, gắn policy (least privilege), dùng device certificate — không commit private key.
