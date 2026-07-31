---
title: "Tuần 5 - Nhật ký công việc"
date: 2026-07-06
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

### Mục tiêu tuần 5:

* Launch **EC2** trong VPC lab; cài MQTT client (mosquitto) để **test publish/subscribe**.
* Tạo **IoT Core Thing**, certificate và attach IoT policy.
* Kết nối TLS từ EC2 tới IoT endpoint; verify message trên MQTT test client.
* Chuẩn bị bộ cert/key để embed vào firmware ESP32 tuần sau.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Launch EC2 t2/t3.micro trong public subnet; SSH vào instance <br> - Cài `mosquitto-clients` để test MQTT | 06/07/2026 | 06/07/2026 | <https://docs.aws.amazon.com/ec2/> |
| 2 | - Tạo **IoT Thing** `smarthome-esp32-lab` trên IoT Core console <br> - Generate certificate + private key; download và lưu an toàn | 07/07/2026 | 07/07/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/create-device-cert.html> |
| 3 | - Attach **IoT policy** (publish/subscribe `smarthome/lab/*`) cho certificate <br> - Test `mosquitto_pub`/`mosquitto_sub` từ EC2 với cert và endpoint 8883 | 08/07/2026 | 08/07/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/connect-to-iot.html> |
| 4 | - Dùng **MQTT test client** trên IoT console subscribe topic lab <br> - Publish payload JSON mẫu `{ "temp": 28.5, "humidity": 65 }` | 09/07/2026 | 09/07/2026 | AWS IoT Core console |
| 5 | - Họp nhóm: demo MQTT test từ EC2; chia sẻ cấu trúc cert cho firmware <br> - Em chuẩn bị folder `certs/` trong repo firmware (không commit private key) | 10/07/2026 | 10/07/2026 | SmartHome_IoT `firmware/` |

### Thành quả tuần 5:

* **EC2 MQTT test** thành công — publish/subscribe qua IoT Core với TLS.
* **Thing + certificate + IoT policy** lab đã tạo và verify.
* Có payload JSON mẫu và quy trình test trước khi nạp firmware ESP32.
* Sẵn sàng cấu hình topic production `smarthome/` và CloudWatch tuần 6.
