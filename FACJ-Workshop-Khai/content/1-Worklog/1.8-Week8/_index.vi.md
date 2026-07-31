---
title: "Tuần 8 - Nhật ký công việc"
date: 2026-07-27
weight: 8
chapter: false
pre: " <b> 1.8. </b> "
---

### Mục tiêu tuần 8:

* Deploy **backend production trên EC2** — PM2 process manager, auto-restart.
* Sửa bug tích hợp tuần 7 (CORS, DynamoDB conditional write, MQTT reconnect).
* Viết **API README** — endpoints, mẫu request/response, env vars, bước deploy.
* Hỗ trợ demo nhóm và hoàn thiện deliverable thực tập.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Cài PM2; cấu hình `ecosystem.config.js` cho `server.js` <br> - Thiết lập PM2 startup khi reboot | 27/07/2026 | 27/07/2026 | <https://pm2.keymetrics.io/> |
| 2 | - Sửa CORS preflight trên `POST /api/commands` <br> - Thêm retry khi DynamoDB throttling | 28/07/2026 | 28/07/2026 | SmartHome_IoT `backend/` |
| 3 | - Sửa MQTT client reconnect khi EC2 mất mạng tạm thời <br> - Chạy lại Postman suite — all green | 29/07/2026 | 29/07/2026 | Postman, CloudWatch |
| 4 | - Viết `backend/API_README.md`: bảng route, ví dụ JSON, key `.env`, mẫu curl <br> - Export Postman collection vào repo | 30/07/2026 | 30/07/2026 | SmartHome_IoT `backend/` |
| 5 | - Demo nhóm: frontend → EC2 API → DynamoDB; firmware telemetry qua MQTT bridge <br> - Bàn giao tài liệu API; cập nhật worklog | 31/07/2026 | 31/07/2026 | - |

### Thành quả tuần 8:

* Backend ổn định trên EC2 với PM2 — survive reboot.
* Bug tích hợp đã sửa; test API pass trên EC2 và API Gateway.
* `API_README.md` đã publish với tài liệu endpoint đầy đủ.
* Deliverable backend SmartHome_IoT hoàn tất; sẵn sàng báo cáo thực tập.
