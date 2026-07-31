---
title: "Tuần 2 - Nhật ký công việc"
date: 2026-06-15
weight: 2
chapter: false
pre: " <b> 1.2. </b> "
---

### Mục tiêu tuần 2:

* Em **own** thiết lập **AWS Budgets** và billing alerts cho tài khoản lab.
* Cấu hình ngưỡng cảnh báo chi phí; document quy trình xử lý khi vượt budget.
* Cài **AWS CLI** trên tất cả máy thành viên; verify identity từng người.
* Security checklist: Root MFA, không dùng Root hàng ngày.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - [ ] Kiểm tra tài khoản AWS lab: Root MFA đã bật chưa <br> - [ ] Tạo IAM admin user; khóa access key Root | 15/06/2026 | 15/06/2026 | <https://docs.aws.amazon.com/accounts/> |
| 2 | - [ ] Tạo **AWS Budget** hàng tháng (ngưỡng 80% / 100%) <br> - [ ] Gắn SNS/email alert cho cảnh báo billing | 16/06/2026 | 16/06/2026 | <https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html> |
| 3 | - [ ] Viết runbook ngắn: khi nhận alert → kiểm tra Cost Explorer → stop EC2/RDS không dùng <br> - [ ] Chia sẻ runbook lên Slack nhóm | 17/06/2026 | 17/06/2026 | AWS Cost Explorer |
| 4 | - [ ] Cài AWS CLI (Windows/macOS) trên máy từng thành viên <br> - [ ] Hướng dẫn `aws configure`; verify `aws sts get-caller-identity` | 18/06/2026 | 18/06/2026 | <https://docs.aws.amazon.com/cli/> |
| 5 | - [ ] Checklist CLI: 100% thành viên pass verify <br> - [ ] Họp nhóm: thống nhất region `ap-southeast-1` và quy tắc không tạo resource ngoài lab | 19/06/2026 | 19/06/2026 | Repo SmartHome_IoT |

### Thành quả tuần 2:

* [x] **AWS Budgets** và billing alerts hoạt động; ngưỡng 80%/100% đã cấu hình.
* [x] Runbook xử lý vượt budget + quy tắc **stop resource** được document.
* [x] **AWS CLI** cài và verify trên toàn bộ máy team.
* [x] Security checklist: Root MFA, IAM admin-only daily use.
* [x] Region và naming convention lab thống nhất cho tuần 3 (IAM).
