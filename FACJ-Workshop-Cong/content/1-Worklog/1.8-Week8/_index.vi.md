---
title: "Tuần 8 - Nhật ký công việc"
date: 2026-07-27
weight: 8
chapter: false
pre: " <b> 1.8. </b> "
---

### Mục tiêu tuần 8:

* **Hoàn thiện tích hợp SmartHome_IoT**: sửa bug, ổn định luồng API/DB/UI/IoT.
* Kiểm tra deploy trên AWS lab (EC2, RDS, S3, CloudWatch) nếu áp dụng.
* Em **hoàn thiện tài liệu Hugo workshop**, báo cáo thực tập và chuẩn bị demo.
* Demo cuối với nhóm; rà soát AWS Budgets; dừng resource không dùng.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - **Dự án:** sửa bug tích hợp từ tuần 7 (API timeout, MQTT reconnect) <br> - Ổn định cấu hình env (`.env`, kết nối RDS, MQTT broker) | 27/07/2026 | 27/07/2026 | Repo SmartHome_IoT |
| 2 | - Kiểm tra deploy trên AWS lab: EC2 backend (Công), RDS data, S3 assets (An) <br> - Phúc test ESP32 trên mạng lab; Quỳnh rà soát CloudWatch logs | 28/07/2026 | 28/07/2026 | <https://docs.aws.amazon.com/ec2/> <br> <https://docs.aws.amazon.com/rds/> |
| 3 | - Rà soát **CloudWatch** alarms và **AWS Budgets** <br> - Soạn kịch bản demo end-to-end; chụp screenshot kiến trúc | 29/07/2026 | 29/07/2026 | <https://docs.aws.amazon.com/cloudwatch/> |
| 4 | - **Tài liệu Hugo:** cập nhật sơ đồ kiến trúc, schema DB, ghi chú tích hợp module (song ngữ) <br> - Hoàn thiện báo cáo thực tập trên site **FACJ-Workshop-khai** | 30/07/2026 | 30/07/2026 | Repo FACJ-Workshop-khai |
| 5 | - **Demo cuối SmartHome_IoT** với nhóm và mentor <br> - Nộp worklog/báo cáo; dừng AWS resource không dùng | 31/07/2026 | 31/07/2026 | Portal FCAJ |

### Thành quả tuần 8:

* Tích hợp SmartHome_IoT **hoàn thiện** và test end-to-end ổn định.
* Kiến trúc, schema DB và tích hợp module **đã có tài liệu Hugo workshop** song ngữ.
* Báo cáo thực tập và material demo sẵn sàng nộp.
* Hoàn thành lộ trình 8 tuần: onboarding → AWS fundamentals → dự án (kiến trúc, DB, tích hợp) → tài liệu & báo cáo.
