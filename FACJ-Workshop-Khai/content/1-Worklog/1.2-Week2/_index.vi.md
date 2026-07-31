---
title: "Tuần 2 - Nhật ký công việc"
date: 2026-06-15
weight: 2
chapter: false
pre: " <b> 1.2. </b> "
---

### Mục tiêu tuần 2:

* Cài và cấu hình **AWS CLI** trên máy local.
* Chạy `aws configure` với access key, secret, region (`ap-southeast-1`).
* Xác minh danh tính bằng `aws sts get-caller-identity`.
* Test lệnh CLI cơ bản phục vụ deploy DynamoDB và Lambda sau này.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Cài AWS CLI v2 trên Windows <br> - Kiểm tra `aws --version` | 15/06/2026 | 15/06/2026 | <https://docs.aws.amazon.com/cli/> |
| 2 | - Chạy `aws configure`; đặt region mặc định và output json <br> - Lưu credential an toàn; không commit vào repo | 16/06/2026 | 16/06/2026 | AWS account nhóm |
| 3 | - Chạy `aws sts get-caller-identity` — xác nhận Account, UserId, Arn <br> - Chụp output cho worklog | 17/06/2026 | 17/06/2026 | <https://docs.aws.amazon.com/cli/latest/reference/sts/get-caller-identity.html> |
| 4 | - Thử `aws iam list-users`, `aws s3 ls` để kiểm tra quyền <br> - Ghi chú action nào cần custom IAM policy | 18/06/2026 | 18/06/2026 | AWS CLI reference |
| 5 | - Ghi lại các bước cài CLI vào notes <br> - Lên kế hoạch IAM policy cho DynamoDB và IoT (tuần 3) | 19/06/2026 | 19/06/2026 | - |

### Thành quả tuần 2:

* AWS CLI đã cài và cấu hình trên máy dev.
* `aws sts get-caller-identity` trả về caller hợp lệ — auth CLI OK.
* Em đã test lệnh read cơ bản; xác định thiếu quyền cho tuần 3.
* Sẵn sàng gắn custom IAM policy cho backend services.
