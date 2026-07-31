---
title: "Tuần 5 - Nhật ký công việc"
date: 2026-07-06
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

### Mục tiêu tuần 5:

* Học **EC2** ở mức frontend cần: instance, public IP, security group cho API port.
* Hiểu **API endpoint** backend (REST) để chuẩn bị tích hợp React dashboard.
* Thử gọi API bằng Postman/fetch; ghi chú format JSON response cho UI.
* Họp nhóm: thống nhất contract API giữa frontend và backend.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Học EC2: instance type, AMI, key pair, Elastic IP <br> - Xem EC2 backend nhóm đang chạy; ghi chú public IP/DNS và port API | 06/07/2026 | 06/07/2026 | <https://docs.aws.amazon.com/ec2/> |
| 2 | - Tìm hiểu Security Group inbound rule cho port API (ví dụ 8080/443) <br> - Hiểu vì sao frontend (S3) gọi HTTPS endpoint, không SSH vào EC2 | 07/07/2026 | 07/07/2026 | <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html> |
| 3 | - Gọi thử API `GET /sensors` bằng Postman; xem cấu trúc JSON (temperature, humidity, door_status) <br> - Ghi chú field nào hiển thị trên card, field nào dùng cho cảnh báo | 08/07/2026 | 08/07/2026 | Postman / Swagger nhóm |
| 4 | - Thử `POST /devices/control` với body JSON; kiểm tra response success/error <br> - Phác thảo UX loading state và error toast khi API timeout | 09/07/2026 | 09/07/2026 | Postman |
| 5 | - Họp nhóm: chốt API contract (endpoint, method, JSON schema) cho frontend <br> - Em tạo bảng mapping API → UI component (sensor card, toggle switch) | 10/07/2026 | 10/07/2026 | Repo SmartHome_IoT |

### Thành quả tuần 5:

* Hiểu **EC2** và cách backend expose API endpoint cho frontend.
* Đã test API bằng Postman; nắm format dữ liệu hiển thị trên dashboard.
* Có bảng mapping **API → UI component** để triển khai React tuần 7.
* Nhóm thống nhất contract API; em sẵn sàng thiết kế Figma chi tiết tuần 6.
