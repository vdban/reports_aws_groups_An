---
title: "Tuần 6 - Nhật ký công việc"
date: 2026-07-13
weight: 6
chapter: false
pre: " <b> 1.6. </b> "
---

### Mục tiêu tuần 6:

* Provision **S3** bucket lab (versioning, block public access) cho artifact SmartHome_IoT.
* Dựng **RDS** lab (MySQL/PostgreSQL) trong private subnet; SG chỉ cho phép EC2 app.
* Thiết lập **CloudWatch alarms** (CPU EC2, RDS storage, billing anomaly).
* **Review AWS Budgets** — so sánh forecast vs actual; điều chỉnh ngưỡng nếu cần.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - [ ] Tạo S3 `smarthome-lab-artifacts-<account>`; bật block public access <br> - [ ] Lifecycle rule: xóa object test sau 30 ngày (cost control) | 13/07/2026 | 13/07/2026 | <https://docs.aws.amazon.com/s3/> |
| 2 | - [ ] Launch RDS `db.t3.micro` trong private subnet; SG `lab-rds-sg` chỉ từ `lab-app-sg` <br> - [ ] Lưu master password trong Secrets Manager (không commit repo) | 14/07/2026 | 14/07/2026 | <https://docs.aws.amazon.com/rds/> |
| 3 | - [ ] CloudWatch alarm: EC2 CPU > 80% 5 phút → SNS notify DevOps <br> - [ ] Alarm RDS free storage < 2GB; alarm billing daily spend spike | 15/07/2026 | 15/07/2026 | <https://docs.aws.amazon.com/cloudwatch/> |
| 4 | - [ ] **Budgets review**: mở Cost Explorer, so forecast tháng 7 vs budget 80%/100% <br> - [ ] Ghi chú service tốn phí nhất; plan stop RDS ngoài giờ lab nếu cần | 16/07/2026 | 16/07/2026 | AWS Budgets / Cost Explorer |
| 5 | - [ ] Handoff connection string (qua Slack DM / Secrets Manager) cho backend <br> - [ ] Họp nhóm: infra S3/RDS/alarms sẵn sàng cho tích hợp SmartHome_IoT | 17/07/2026 | 17/07/2026 | Repo SmartHome_IoT |

### Thành quả tuần 6:

* [x] **S3** lab bucket secure; lifecycle rule giảm chi phí storage.
* [x] **RDS** lab trong private subnet; credentials trong Secrets Manager.
* [x] **CloudWatch alarms** CPU/storage/billing đã cấu hình.
* [x] **Budgets review** hoàn tất; biết service nào cần stop khi không lab.
* [x] Backend team kết nối được DB; sẵn sàng Cognito tuần 7.
