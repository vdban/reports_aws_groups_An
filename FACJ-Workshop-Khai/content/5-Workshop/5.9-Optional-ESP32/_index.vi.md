---
title: "5.9 ESP32 thật"
date: 2026-07-01
weight: 9
chapter: false
pre: " <b>  </b> "
---

#  ESP32 thật (tuỳ chọn)

Demo mặc định dùng **Virtual ESP32** trên EC2 (PM2). Nếu có board ESP32, có thể thay thế để gửi sensor thật qua MQTT.

---

## Bước 1 — Dừng Virtual ESP32 trên EC2

Tránh trùng **Client ID** `YoloUNODevice`:

```bash
ssh -i smarthome-key.pem ec2-user@EC2_PUBLIC_IP
pm2 stop virtual-esp32
pm2 save
```


**Console:** EC2 → Connect → chạy lệnh trên hoặc dùng **Systems Manager** → **Run command**.

---

## Bước 2 — Chuẩn bị cert device

Cert Thing **`YoloUNODevice`** đã tạo ở [5.3 IoT Core](5.3-iot-core/).

Trích cert cho firmware:

```powershell
cd SmartHome_IoT-main\backend
npm run extract-certs
```

File output dùng cho `code/secrets.h`.


---

## Bước 3 — Cấu hình WiFi & MQTT trong firmware

Sửa `SmartHome_IoT-main/code/secrets.h` (hoặc file tương đương):

- WiFi SSID / password
- IoT endpoint (`IOT_ENDPOINT`)
- Cert/key từ `certs-device/`


---

## Bước 4 — Flash firmware Arduino IDE

1. Mở `code/IoT_Lab_ESP32/IoT_Lab_ESP32.ino`.
2. Board: **ESP32 Dev Module**, port COM tương ứng.
3. **Upload**.



---

## Bước 5 — Kiểm tra trên AWS Console

**IoT Core** → **MQTT test client**:

- **Subscribe** topic `device/+/telemetry` (hoặc topic project dùng)
- Thấy message từ ESP32


Dashboard web — badge **IoT** trên thiết bị **Đèn**, **Quạt**, **Cửa**.


---

## Bật lại Virtual ESP32 (khi không dùng board)

```bash
pm2 start virtual-esp32
pm2 save
```

