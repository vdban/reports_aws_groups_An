---
title: "Tuần 7 - Nhật ký công việc"
date: 2026-07-20
weight: 7
chapter: false
pre: " <b> 1.7. </b> "
---

### Mục tiêu tuần 7:

* **Cập nhật firmware ESP32**: đọc DHT (nhiệt/ẩm), LDR (ánh sáng); publish định kỳ lên IoT Core.
* Điều khiển **relay** quạt, đèn, cửa qua subscribe topic `smarthome/command/*`.
* Xử lý lệnh **Pomodoro** (start/stop/pause) từ dashboard.
* Test tích hợp với backend/UI; thu thập bug list cho tuần 8.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Nối **DHT22** trên breadboard (data GPIO, pull-up 4.7kΩ); đọc temp/humidity ổn định <br> - Publish lên `smarthome/sensor/temperature`, `humidity` mỗi 5 giây | 20/07/2026 | 20/07/2026 | SmartHome_IoT `firmware/` |
| 2 | - Thêm **LDR** + voltage divider; đọc mức ánh sáng, publish `smarthome/sensor/light` <br> - Hiệu chỉnh ngưỡng sáng/tối trên Serial Monitor | 21/07/2026 | 21/07/2026 | SmartHome_IoT `firmware/` |
| 3 | - Cấu hình **3 relay module** cho quạt, đèn, cửa (GPIO riêng, common GND) <br> - Subscribe `smarthome/command/fan|light|door`; toggle relay theo payload `ON`/`OFF` | 22/07/2026 | 22/07/2026 | SmartHome_IoT `firmware/` |
| 4 | - Implement handler **Pomodoro**: nhận `{ "action": "start", "duration": 25 }` trên `smarthome/command/pomodoro` <br> - LED/buzzer feedback khi hết giờ (tùy chọn trên breadboard) | 23/07/2026 | 23/07/2026 | SmartHome_IoT `firmware/` |
| 5 | - **Test E2E nội bộ:** dashboard bật đèn → relay click → DHT/LDR hiển thị trên UI <br> - Demo nhóm; ghi bug (MQTT delay, relay noise, WiFi drop) cho tuần 8 | 24/07/2026 | 24/07/2026 | Repo SmartHome_IoT |

### Thành quả tuần 7:

* Firmware đọc **temp/humidity/light** và publish ổn định lên IoT Core.
* **Relay quạt/đèn/cửa** điều khiển được từ dashboard qua MQTT.
* Lệnh **Pomodoro** hoạt động trên firmware.
* Luồng ESP32 → IoT Core → backend → UI đã test; có bug list cho tuần cuối.
