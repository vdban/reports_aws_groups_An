---
title: "Tuần 6 - Nhật ký công việc"
date: 2026-07-13
weight: 6
chapter: false
pre: " <b> 1.6. </b> "
---

### Mục tiêu tuần 6:

* Thiết kế và tạo **DynamoDB single-table** cho entity SmartHome.
* Implement tầng repository Node.js — `putSensorReading`, `getDeviceState`, `queryByUser`.
* Upload env config lên **S3** (`.env.template`, script deploy).
* Bật **CloudWatch Logs** cho backend và log group Lambda.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Thiết kế key single-table: pattern `PK`/`SK` (`USER#`, `DEVICE#`, `SENSOR#`) <br> - Tạo bảng `SmartHomeTable` với GSI tra cứu device | 13/07/2026 | 13/07/2026 | <https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-general-nosql-design.html> |
| 2 | - Implement `repositories/dynamoRepository.js` — wrapper DocumentClient <br> - Thêm helper `putItem`, `query`, `updateItem` | 14/07/2026 | 14/07/2026 | AWS SDK v3 `@aws-sdk/lib-dynamodb` |
| 3 | - Gắn repository vào routes `server.js`: `POST /api/sensors`, `GET /api/devices/:id` <br> - Seed dữ liệu mẫu bằng script | 15/07/2026 | 15/07/2026 | SmartHome_IoT `backend/` |
| 4 | - Tạo S3 bucket `smarthome-env-assets`; upload `.env.template`, shell script deploy <br> - Chặn public access; IAM role read-only từ EC2 | 16/07/2026 | 16/07/2026 | <https://docs.aws.amazon.com/s3/> |
| 5 | - Tạo CloudWatch log group `/smarthome/backend` <br> - Thêm Winston logger; stream lỗi API và sự kiện MQTT lên CloudWatch | 17/07/2026 | 17/07/2026 | <https://docs.aws.amazon.com/cloudwatch/> |

### Thành quả tuần 6:

* DynamoDB single-table đã chạy; module repository tích hợp xong.
* Routes CRUD lưu dữ liệu sensor và device — em verify bằng Postman.
* Env assets lưu trên S3; script deploy đã ghi chú.
* CloudWatch ghi log backend phục vụ debug tuần 7.
