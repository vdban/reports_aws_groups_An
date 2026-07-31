---
title: "Tuần 3 - Nhật ký công việc"
date: 2026-06-22
weight: 3
chapter: false
pre: " <b> 1.3. </b> "
---

### Mục tiêu tuần 3:

* Học **IAM** cho IoT: user, policy, least privilege.
* Nắm khái niệm **AWS IoT Core**: Thing, certificate, IoT policy, endpoint.
* Viết/thử **IoT policy JSON** cho phép device publish/subscribe topic lab.
* So sánh Adafruit IO vs IoT Core để chuẩn bị chuyển firmware ESP32 sang AWS.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Học IAM: user, group, policy, Access Key <br> - Tạo IAM user lab; không dùng Root hàng ngày | 22/06/2026 | 22/06/2026 | <https://docs.aws.amazon.com/iam/> |
| 2 | - Giới thiệu **AWS IoT Core**: registry, Thing, device shadow (khái niệm) <br> - Xem IoT endpoint region `ap-southeast-1` trên console | 23/06/2026 | 23/06/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html> |
| 3 | - Học **IoT policy**: `iot:Connect`, `iot:Publish`, `iot:Subscribe`, `iot:Receive` <br> - Viết policy mẫu cho topic `smarthome/lab/*` | 24/06/2026 | 24/06/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/iot-policies.html> |
| 4 | - Tìm hiểu certificate X.509: device cert, CA root, private key <br> - Ghi chú file `.pem`/`.crt` cần embed vào firmware ESP32 | 25/06/2026 | 25/06/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/device-certs-your-own.html> |
| 5 | - Họp nhóm: thống nhất dùng **IoT Core** làm broker chính; Adafruit IO giữ làm POC <br> - Em liệt kê quyền policy tối thiểu cho ESP32 publish sensor + nhận lệnh relay | 26/06/2026 | 26/06/2026 | Repo SmartHome_IoT |

### Thành quả tuần 3:

* Nắm **IAM** và **IoT Core** ở mức lab (Thing, cert, policy, endpoint).
* Có **IoT policy JSON mẫu** cho topic `smarthome/lab/*`.
* Hiểu certificate cần thiết để ESP32 kết nối TLS tới IoT Core.
* Nhóm thống nhất hướng MQTT production trên AWS IoT Core.
