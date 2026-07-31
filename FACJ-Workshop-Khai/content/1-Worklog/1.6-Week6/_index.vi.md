---
title: "Tuần 6 - Nhật ký công việc"
date: 2026-07-13
weight: 6
chapter: false
pre: " <b> 1.6. </b> "
---

### Mục tiêu tuần 6:

* Thiết kế và dùng DynamoDB lưu dữ liệu cảm biến/thiết bị.
* Lưu trữ tài nguyên cấu hình trên S3 nếu cần.
* Gửi log backend lên CloudWatch để theo dõi lỗi.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Thống nhất schema bảng dữ liệu với nhóm (cảm biến, thiết bị, lệnh). | 13/07/2026 | 13/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 2 | - Viết lớp truy cập dữ liệu; nối các route API với DynamoDB. | 14/07/2026 | 14/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 3 | - Test thêm, đọc, cập nhật dữ liệu qua API. | 15/07/2026 | 15/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 4 | - Cấu hình ghi log lên CloudWatch; xem log khi API lỗi. | 16/07/2026 | 16/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 5 | - Họp nhóm: demo API đọc/ghi dữ liệu thật trên cloud. | 17/07/2026 | 17/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |

### Thành quả tuần 6:

* Dữ liệu cảm biến và thiết bị lưu được trên DynamoDB.
* Log backend theo dõi được trên CloudWatch.
* API sẵn sàng cho tích hợp serverless tuần 7.
