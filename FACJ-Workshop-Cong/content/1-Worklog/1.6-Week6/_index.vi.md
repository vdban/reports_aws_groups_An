---
title: "Tuần 6 - Nhật ký công việc"
date: 2026-07-13
weight: 6
chapter: false
pre: " <b> 1.6. </b> "
---

### Mục tiêu tuần 6:

* Học **S3**, **RDS** và **CloudWatch** (lưu trữ, CSDL quan hệ, giám sát).
* **Bắt đầu dự án SmartHome_IoT** song song với việc học AWS.
* Em **chốt kiến trúc hệ thống** và **thiết kế schema DB** (single-table trên RDS, tham khảo DynamoDB).
* Họp nhóm: phân công module và thống nhất kế hoạch tích hợp.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Học **S3**: bucket, object, IAM access; tạo bucket `smarthome-assets` <br> - Phối hợp An upload static assets frontend | 13/07/2026 | 13/07/2026 | <https://docs.aws.amazon.com/s3/> |
| 2 | - Học **RDS**: instance, subnet group, security; tạo RDS trong private subnet <br> - Quỳnh hỗ trợ cấu hình security group DB | 14/07/2026 | 14/07/2026 | <https://docs.aws.amazon.com/rds/> |
| 3 | - Học **CloudWatch**: metrics, logs, alarms; tạo alarm EC2/RDS cơ bản <br> - Rà soát **AWS Budgets** chi phí lab nhóm | 15/07/2026 | 15/07/2026 | <https://docs.aws.amazon.com/cloudwatch/> |
| 4 | - **Dự án:** phân tích repo SmartHome_IoT (`frontend/`, `backend/`, `code/` ESP32) <br> - Hoàn thiện sơ đồ kiến trúc mục tiêu (VPC, EC2, S3, RDS, CloudWatch) | 16/07/2026 | 16/07/2026 | Repo SmartHome_IoT |
| 5 | - **Thiết kế schema DB single-table** trên RDS: `devices`, `sensor_readings`, `commands`, `users` <br> - **Họp nhóm:** chốt kiến trúc, schema, phân công Công (API), An (UI), Phúc (MQTT) | 17/07/2026 | 17/07/2026 | Repo SmartHome_IoT |

### Thành quả tuần 6:

* Nắm **S3**, **RDS**, **CloudWatch** cho lab và dự án.
* **Kiến trúc SmartHome_IoT** đã chốt và có tài liệu.
* **Schema cơ sở dữ liệu single-table (RDS)** đã thiết kế và review với nhóm.
* Module đã phân công; sẵn sàng tích hợp và học serverless/auth tuần 7.
