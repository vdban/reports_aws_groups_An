---
title: "Tuần 4 - Nhật ký công việc"
date: 2026-06-29
weight: 4
chapter: false
pre: " <b> 1.4. </b> "
---

### Mục tiêu tuần 4:

* Học **VPC**: subnet, route table, Internet Gateway, Security Group.
* Vẽ và hiểu **đường đi dữ liệu device-to-cloud**: ESP32 (WiFi) → Internet → IoT Core endpoint.
* Phân biệt bảo mật lớp mạng (SG/NACL) vs **IoT policy** trên thiết bị.
* Chuẩn bị mental model trước khi test MQTT từ EC2 tuần sau.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Học VPC: CIDR, public/private subnet, route table <br> - Tạo VPC lab đơn giản trên console | 29/06/2026 | 29/06/2026 | <https://docs.aws.amazon.com/vpc/> |
| 2 | - Internet Gateway, NAT (khái niệm); outbound traffic từ private subnet <br> - Ghi chú IoT Core là managed service — device không nằm trong VPC lab | 30/06/2026 | 30/06/2026 | <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html> |
| 3 | - Vẽ sơ đồ: **ESP32 trên breadboard** → WiFi router → Internet → **AWS IoT Core** (port 8883 MQTT/TLS) | 01/07/2026 | 01/07/2026 | SmartHome_IoT architecture notes |
| 4 | - So sánh Security Group (EC2 backend tuần sau) vs IoT policy (ESP32) <br> - Liệt kê điểm lỗi thường gặp: DNS, cert hết hạn, sai region endpoint | 02/07/2026 | 02/07/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/transport-security.html> |
| 5 | - Họp nhóm: review sơ đồ device-to-cloud; backend chạy EC2 trong VPC, firmware kết nối thẳng IoT Core <br> - Em xác nhận ESP32 chỉ cần WiFi + cert, không cần VPN | 03/07/2026 | 03/07/2026 | Repo SmartHome_IoT |

### Thành quả tuần 4:

* Nắm **VPC** cơ bản và vai trò IGW/route table.
* Có **sơ đồ device-to-cloud** rõ ràng cho SmartHome_IoT (ESP32 → IoT Core).
* Phân biệt được lớp bảo mật VPC (EC2) vs IoT policy (thiết bị).
* Sẵn sàng lab EC2 MQTT test và tạo Thing/certificate tuần 5.
