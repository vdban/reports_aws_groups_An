---
title: "Tuần 4 - Nhật ký công việc"
date: 2026-06-29
weight: 4
chapter: false
pre: " <b> 1.4. </b> "
---

### Mục tiêu tuần 4:

* Dựng **lab VPC** cho SmartHome_IoT: VPC, public/private subnet, IGW, route tables.
* Cấu hình **Security Groups** (SSH chỉ từ IP lab, HTTP/HTTPS cho app tier).
* Tag resource chuẩn (`Project=SmartHome`, `Env=lab`) để tracking chi phí.
* Document sơ đồ mạng và checklist trước khi launch EC2.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - [ ] Tạo VPC `10.0.0.0/16` region `ap-southeast-1` <br> - [ ] Tạo public subnet (`10.0.1.0/24`) + private subnet (`10.0.2.0/24`) across 2 AZ | 29/06/2026 | 29/06/2026 | <https://docs.aws.amazon.com/vpc/> |
| 2 | - [ ] Gắn Internet Gateway; cấu hình route table public → IGW <br> - [ ] Private subnet: route qua NAT (hoặc ghi chú cost trade-off nếu chưa bật NAT) | 30/06/2026 | 30/06/2026 | VPC User Guide |
| 3 | - [ ] Tạo SG `lab-bastion-sg`: SSH (22) chỉ IP văn phòng/lab <br> - [ ] Tạo SG `lab-app-sg`: 80/443 từ bastion hoặc ALB (chuẩn bị tuần 5) | 01/07/2026 | 01/07/2026 | Security Groups docs |
| 4 | - [ ] Apply tags cost allocation; verify trong Cost Explorer filter by tag <br> - [ ] Security checklist: default SG không attach trực tiếp | 02/07/2026 | 02/07/2026 | AWS Cost Allocation Tags |
| 5 | - [ ] Vẽ sơ đồ VPC upload repo; checklist pre-EC2 review với mentor <br> - [ ] Họp nhóm: xác nhận subnet placement cho EC2/RDS tuần 5–6 | 03/07/2026 | 03/07/2026 | Repo SmartHome_IoT |

### Thành quả tuần 4:

* [x] Lab **VPC** với public/private subnet và IGW hoạt động.
* [x] **Security Groups** lockdown SSH; app tier tách biệt.
* [x] Resource tagging chuẩn — theo dõi chi phí theo project.
* [x] Sơ đồ mạng và pre-EC2 checklist được document.
* [x] Sẵn sàng launch EC2 + IAM Role tuần 5.
