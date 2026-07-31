---
title: "Tuần 7 - Nhật ký công việc"
date: 2026-07-20
weight: 7
chapter: false
pre: " <b> 1.7. </b> "
---

### Mục tiêu tuần 7:

* Triển khai một số endpoint serverless qua Lambda và API Gateway.
* Nối luồng MQTT từ IoT Core vào backend và DynamoDB.
* Test end-to-end: thiết bị → cloud → API → giao diện.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Tạo Lambda xử lý telemetry; gắn trigger từ IoT rule. | 20/07/2026 | 20/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 2 | - Expose REST API qua API Gateway; map tới Lambda/backend. | 21/07/2026 | 21/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 3 | - Test bằng công cụ gọi API; so sánh response với frontend mong đợi. | 22/07/2026 | 22/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 4 | - Phối hợp firmware gửi dữ liệu thử; kiểm tra hiển thị trên dashboard. | 23/07/2026 | 23/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 5 | - Ghi danh sách lỗi nhỏ cần xử lý tuần 8. | 24/07/2026 | 24/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |

### Thành quả tuần 7:

* Luồng telemetry end-to-end hoạt động.
* API Gateway và Lambda chạy ổn với dữ liệu thật.
* Có checklist bug cho tuần cuối.
