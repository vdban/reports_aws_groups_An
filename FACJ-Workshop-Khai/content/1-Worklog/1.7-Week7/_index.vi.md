---
title: "Tuần 7 - Nhật ký công việc"
date: 2026-07-20
weight: 7
chapter: false
pre: " <b> 1.7. </b> "
---

### Mục tiêu tuần 7:

* Deploy **Lambda** handler mirror các route chính của `server.js`.
* Cấu hình **API Gateway REST** — `/sensors`, `/devices`, `/commands` với Lambda proxy integration.
* Implement **MQTT bridge** — IoT Core → Lambda → ghi DynamoDB.
* Tạo Postman collection; chạy full API test suite.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Đóng gói Lambda: `getSensors`, `postSensor`, `updateDevice` <br> - Tái sử dụng layer `dynamoRepository.js` | 20/07/2026 | 20/07/2026 | <https://docs.aws.amazon.com/lambda/> |
| 2 | - Tạo REST API trên API Gateway; map method tới Lambda ARN <br> - Bật CORS; deploy stage `dev` | 21/07/2026 | 21/07/2026 | <https://docs.aws.amazon.com/apigateway/latest/developerguide/setup-lambda-proxy.html> |
| 3 | - Cấu hình IoT Rule: topic `smarthome/+/telemetry` → Lambda `mqttIngest` <br> - Parse JSON payload; gọi `putSensorReading` | 22/07/2026 | 22/07/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/iot-rules.html> |
| 4 | - Tạo Postman collection với env (`API_BASE`, `DEVICE_ID`) <br> - Test luồng GET/POST; so sánh response EC2 vs API Gateway | 23/07/2026 | 23/07/2026 | Postman |
| 5 | - Test tích hợp nhóm: ESP32 publish → IoT → Lambda → DynamoDB → `GET /api/sensors` <br> - Ghi lỗi trên CloudWatch; sửa timeout cold start | 24/07/2026 | 24/07/2026 | Repo SmartHome_IoT |

### Thành quả tuần 7:

* Lambda + API Gateway REST endpoint đã live và gọi được.
* MQTT bridge ingest telemetry vào DynamoDB — em verify end-to-end.
* Postman collection cover các scenario API chính, test pass.
* Danh sách bug sẵn sàng cho deploy EC2 tuần 8.
