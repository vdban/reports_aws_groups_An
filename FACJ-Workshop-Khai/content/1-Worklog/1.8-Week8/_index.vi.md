---
title: "Tuần 8 - Nhật ký công việc"
date: 2026-07-27
weight: 8
chapter: false
pre: " <b> 1.8. </b> "
---

### Mục tiêu tuần 8:

* Ổn định backend production trên EC2 (tự khởi động lại khi lỗi).
* Sửa các lỗi tích hợp còn lại (CORS, ghi DB, mất kết nối MQTT).
* Hoàn thiện tài liệu API và hỗ trợ demo cuối kỳ.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Cấu hình process manager để backend tự chạy lại sau reboot/lỗi. | 27/07/2026 | 27/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 2 | - Sửa lỗi CORS và retry khi DynamoDB quá tải tạm thời. | 28/07/2026 | 28/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 3 | - Cải thiện cơ chế reconnect MQTT khi mạng gián đoạn. | 29/07/2026 | 29/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 4 | - Viết tài liệu mô tả endpoint, ví dụ request/response cho nhóm. | 30/07/2026 | 30/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 5 | - Demo cuối: frontend → EC2 API → DB; firmware gửi telemetry qua MQTT. | 31/07/2026 | 31/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |

### Thành quả tuần 8:

* Backend ổn định trên EC2, survive reboot.
* Test API pass trên môi trường production.
* Tài liệu API đã bàn giao; deliverable backend hoàn tất.
