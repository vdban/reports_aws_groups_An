---
title: "Tuần 7 - Nhật ký công việc"
date: 2026-07-20
weight: 7
chapter: false
pre: " <b> 1.7. </b> "
---

### Mục tiêu tuần 7:

* Học **DynamoDB**, **Lambda**, **API Gateway** và **Cognito** (tham khảo mở rộng kiến trúc).
* Em **dẫn dắt tích hợp module** SmartHome_IoT: backend (Công) ↔ frontend (An) ↔ IoT/MQTT (Phúc).
* Kiểm tra luồng cảm biến → lưu trữ RDS → điều khiển actuator trên dashboard.
* Demo nội bộ và lập danh sách bug trước tuần cuối.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Học **DynamoDB**: table, partition/sort key; so sánh NoSQL vs RDS cho use case IoT <br> - Ghi chú hướng mở rộng single-table sang DynamoDB | 20/07/2026 | 20/07/2026 | <https://docs.aws.amazon.com/dynamodb/> |
| 2 | - Học **Lambda** + **API Gateway**: mô hình serverless API <br> - Chạy function lab; đánh giá khả năng thay thế một phần REST backend | 21/07/2026 | 21/07/2026 | <https://docs.aws.amazon.com/lambda/> <br> <https://docs.aws.amazon.com/apigateway/> |
| 3 | - Học **Cognito**: User Pool, luồng xác thực <br> - Review với An khả năng tích hợp auth cho dashboard | 22/07/2026 | 22/07/2026 | <https://docs.aws.amazon.com/cognito/> |
| 4 | - **Tích hợp module:** backend API ↔ schema RDS (sensor updates, device commands) <br> - Kết nối React dashboard (An) với backend; Phúc test MQTT bridge ESP32 → API | 23/07/2026 | 23/07/2026 | SmartHome_IoT `backend/`, `frontend/` |
| 5 | - Test end-to-end: ESP32/MQTT → backend → RDS → UI <br> - **Demo nội bộ nhóm;** thu thập bug list; phân công fix tuần 8 | 24/07/2026 | 24/07/2026 | Repo SmartHome_IoT |

### Thành quả tuần 7:

* Nắm **DynamoDB**, **Lambda**, **API Gateway**, **Cognito** ở mức lab và kiến trúc tham khảo.
* **Các module SmartHome_IoT đã tích hợp** — backend, frontend và IoT kết nối qua API/MQTT.
* Luồng chính đã kiểm tra (đọc/ghi cảm biến, điều khiển đèn/quạt/cửa).
* Có bug list và kế hoạch hoàn thiện cho tuần 8.
