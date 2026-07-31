---
title: "Tuần 4 - Nhật ký công việc"
date: 2026-06-29
weight: 4
chapter: false
pre: " <b> 1.4. </b> "
---

### Mục tiêu tuần 4:

* Học VPC cơ bản — subnet, route table, internet gateway.
* Cấu hình **Security Group** cho traffic API backend.
* Mở inbound port **3000** (Express dev) và **8080** (alt/proxy) từ nguồn cho phép.
* Test kết nối TCP trước khi deploy backend lên EC2.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Xem layout VPC trong AWS account nhóm <br> - Xác định subnet cho EC2 backend | 29/06/2026 | 29/06/2026 | <https://docs.aws.amazon.com/vpc/> |
| 2 | - Tạo Security Group `sg-smarthome-api` <br> - Thêm inbound: TCP 3000 từ IP nhóm / frontend SG | 30/06/2026 | 30/06/2026 | AWS Console — EC2 Security Groups |
| 3 | - Thêm inbound: TCP 8080 cho reverse proxy hoặc health check <br> - Giới hạn SSH (22) chỉ IP admin | 01/07/2026 | 01/07/2026 | VPC best practices |
| 4 | - Gắn SG vào EC2 test <br> - Curl `http://<public-ip>:3000/health` từ máy local | 02/07/2026 | 02/07/2026 | `curl`, SmartHome_IoT `backend/` |
| 5 | - Ghi rule SG vào bản nháp README repo <br> - Thống nhất port với cấu hình API base URL frontend | 03/07/2026 | 03/07/2026 | Repo SmartHome_IoT |

### Thành quả tuần 4:

* Security Group đã cấu hình cho port API 3000 và 8080.
* Rule inbound tuân thủ least exposure — không mở `0.0.0.0/0` cho API.
* Em đã verify kết nối port trên instance test.
* Tầng network sẵn sàng cho EC2 backend tuần 5.
