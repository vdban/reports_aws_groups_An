---
title: "Tuần 4 - Nhật ký công việc"
date: 2026-06-29
weight: 4
chapter: false
pre: " <b> 1.4. </b> "
---

### Mục tiêu tuần 4:

* Học **VPC**: subnet public/private, route table, Internet Gateway, Security Group.
* Dựng VPC lab theo quy ước nhóm.
* Em **vẽ sơ đồ kiến trúc mạng mục tiêu** cho SmartHome_IoT (API public, DB private, IoT ingress).
* Họp nhóm rà soát trước khi lên kế hoạch EC2 tuần 5.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Học VPC, CIDR, Availability Zone, public/private subnet | 29/06/2026 | 29/06/2026 | <https://docs.aws.amazon.com/vpc/> |
| 2 | - Tạo VPC lab `smarthome-vpc` + public/private subnet <br> - Gắn Internet Gateway và route public; phối hợp Quỳnh triển khai | 30/06/2026 | 30/06/2026 | <https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html> |
| 3 | - Cấu hình Security Group (SSH, HTTP/HTTPS, API port) <br> - So sánh Security Group vs NACL; ghi chú port MQTT/API | 01/07/2026 | 01/07/2026 | <https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html> |
| 4 | - **Vẽ sơ đồ kiến trúc mạng mục tiêu:** frontend (An), backend EC2 (Công), RDS private, IoT/MQTT (Phúc) <br> - Export diagram cho tài liệu workshop | 02/07/2026 | 02/07/2026 | Repo SmartHome_IoT |
| 5 | - **Họp nhóm:** chốt CIDR `10.0.0.0/16`, quy ước Security Group <br> - Checklist trước khi launch EC2 và plan hosting backend tuần 5 | 03/07/2026 | 03/07/2026 | - |

### Thành quả tuần 4:

* **VPC** lab hoạt động với public/private subnet và Internet access.
* **Sơ đồ kiến trúc mạng mục tiêu** đã hoàn thiện và thống nhất với nhóm.
* Security Group và luồng traffic (API, DB, IoT) đã được mô tả rõ.
* Sẵn sàng lập kế hoạch hosting EC2 tuần 5.
