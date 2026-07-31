---
title: "Tuần 8 - Nhật ký công việc"
date: 2026-07-27
weight: 8
chapter: false
pre: " <b> 1.8. </b> "
---

### Mục tiêu tuần 8:

* **Demo E2E phần cứng** trước mentor: cảm biến realtime, điều khiển relay từ dashboard.
* Viết **firmware README**: pinout breadboard, flash steps, cấu hình WiFi/cert.
* **Fix MQTT reconnect** khi WiFi drop hoặc IoT Core timeout.
* Hoàn thiện worklog và chuẩn bị báo cáo workshop.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - **Fix MQTT reconnect:** exponential backoff, gọi lại `WiFi.reconnect()` + `client.connect()` <br> - Test ngắt WiFi router 30 giây rồi bật lại — ESP32 tự kết nối lại | 27/07/2026 | 27/07/2026 | SmartHome_IoT `firmware/` |
| 2 | - Sửa bug tích hợp tuần 7: relay stuck ON, payload parse lỗi khi JSON thiếu field <br> - Ổn định interval publish DHT (tránh block loop khi đọc sensor fail) | 28/07/2026 | 28/07/2026 | SmartHome_IoT `firmware/` |
| 3 | - Viết **`firmware/README.md`**: sơ đồ nối DHT/relay/LDR, GPIO table, hướng dẫn Arduino IDE / PlatformIO, file `secrets.h` mẫu | 29/07/2026 | 29/07/2026 | SmartHome_IoT `firmware/README.md` |
| 4 | - **Rehearsal demo E2E:** em trình bày breadboard, Serial Monitor, dashboard điều khiển quạt/đèn/cửa + Pomodoro <br> - Nhận feedback mentor về độ ổn định kết nối | 30/07/2026 | 30/07/2026 | Repo SmartHome_IoT |
| 5 | - Demo chính thức trước mentor và nhóm <br> - Hoàn thiện worklog Hugo; ghi chú bài học (cert rotation, nguồn relay, dây breadboard) | 31/07/2026 | 31/07/2026 | FACJ-Workshop-phuc |

### Thành quả tuần 8:

* **MQTT reconnect** ổn định sau mất WiFi/IoT timeout.
* **Firmware README** đầy đủ pinout, flash và cấu hình.
* **Demo E2E phần cứng** thành công — sensor + actuator + Pomodoro qua IoT Core.
* Worklog 8 tuần hoàn tất; sẵn sàng nộp báo cáo workshop.
