---
title: "Tuần 5 - Nhật ký công việc"
date: 2026-07-06
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

### Mục tiêu tuần 5:

* Triển khai backend lên EC2 và chạy thử API.
* Dùng IAM Role thay vì lưu key cứng trên máy chủ.
* Xử lý lỗi CORS khi frontend gọi API.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Phối hợp DevOps truy cập EC2 lab; cài runtime Node.js. | 06/07/2026 | 06/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 2 | - Chạy thử backend; kiểm tra API trả dữ liệu cảm biến. | 07/07/2026 | 07/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 3 | - Gắn IAM Role cho EC2; xác nhận backend lấy credential tự động. | 08/07/2026 | 08/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 4 | - Sửa cấu hình CORS sau khi frontend báo lỗi cross-origin. | 09/07/2026 | 09/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 5 | - Demo nội bộ với frontend: gọi API đọc nhiệt độ/độ ẩm thành công. | 10/07/2026 | 10/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |

### Thành quả tuần 5:

* Backend chạy ổn trên EC2, frontend gọi được API.
* Không còn hardcode key trên máy chủ.
* Sẵn sàng tích hợp DynamoDB tuần 6.
