---
title: "Tuần 6 - Nhật ký công việc"
date: 2026-07-13
weight: 6
chapter: false
pre: " <b> 1.6. </b> "
---

### Mục tiêu tuần 6:

* Cấu hình **IoT Core topics** production: `smarthome/sensor/*`, `smarthome/command/*`.
* Thiết lập **publish cảm biến** (temp, humidity, light) từ client lab; align payload với backend.
* Bật **CloudWatch metrics** cho IoT Core (connect, publish, rule execution).
* Bắt đầu nạp firmware ESP32 kết nối IoT Core thay Adafruit IO.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Định nghĩa topic tree: `smarthome/sensor/temperature`, `humidity`, `light`; `smarthome/command/fan`, `light`, `door`, `pomodoro` | 13/07/2026 | 13/07/2026 | SmartHome_IoT MQTT schema |
| 2 | - Cập nhật **IoT policy** cho phép publish/subscribe đúng prefix `smarthome/` <br> - Test publish từ mosquitto trên EC2 | 14/07/2026 | 14/07/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/iot-policies.html> |
| 3 | - Cấu hình **CloudWatch** cho IoT: metric `PublishIn.Success`, connection count <br> - Tạo alarm đơn giản khi device disconnect bất thường | 15/07/2026 | 15/07/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/metrics.html> |
| 4 | - **Firmware:** cấu hình WiFi + IoT endpoint + embed cert vào ESP32 <br> - Nạp thử; Serial Monitor log kết nối TLS thành công | 16/07/2026 | 16/07/2026 | SmartHome_IoT `firmware/` |
| 5 | - Họp nhóm: demo publish `smarthome/sensor/temperature` từ ESP32 lên IoT test client <br> - Backend xác nhận subscribe/rule nhận được payload | 17/07/2026 | 17/07/2026 | Repo SmartHome_IoT |

### Thành quả tuần 6:

* Topic **`smarthome/`** và IoT policy production đã cấu hình.
* **CloudWatch metrics** theo dõi kết nối/publish IoT Core.
* ESP32 **kết nối IoT Core lần đầu** — publish sensor thử thành công.
* Team align schema MQTT; sẵn sàng hoàn thiện firmware tuần 7.
