---
title: "Tuần 2 - Nhật ký công việc"
date: 2026-06-15
weight: 2
chapter: false
pre: " <b> 1.2. </b> "
---

### Mục tiêu tuần 2:

* Tạo **tài khoản AWS** và thiết lập bảo mật cơ bản (Root MFA, IAM admin user).
* Cấu hình **AWS Budgets** để theo dõi chi phí lab nhóm.
* Cài đặt **AWS CLI** và thực hành lệnh cơ bản.
* Em soạn **quy ước lab nhóm** (đặt tên resource, region, chi phí, bảo mật).

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Tạo tài khoản AWS; bật Root MFA <br> - Tạo IAM user admin (không dùng Root hàng ngày) | 15/06/2026 | 15/06/2026 | <https://docs.aws.amazon.com/accounts/> |
| 2 | - Tìm hiểu Free Tier và billing model <br> - Tạo **AWS Budget** hàng tháng kèm email cảnh báo ngưỡng chi phí | 16/06/2026 | 16/06/2026 | <https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html> |
| 3 | - Cài AWS CLI trên Windows; chạy `aws configure` <br> - Xác minh `aws sts get-caller-identity` | 17/06/2026 | 17/06/2026 | <https://docs.aws.amazon.com/cli/> |
| 4 | - Soạn **Lab Conventions** (prefix `smarthome-`, region `ap-southeast-1`, quy tắc stop/terminate) <br> - Chia sẻ tài liệu với Quỳnh (DevOps) và nhóm để thống nhất | 18/06/2026 | 18/06/2026 | Repo SmartHome_IoT |
| 5 | - **Họp nhóm:** review quy ước lab; phác thảo stack AWS cho SmartHome_IoT <br> - Thống nhất phạm vi MVP (cảm biến, actuator, dashboard) | 19/06/2026 | 19/06/2026 | Repo SmartHome_IoT |

### Thành quả tuần 2:

* Tài khoản AWS sẵn sàng; Root đã bật MFA.
* **AWS Budgets** và cảnh báo chi phí đã cấu hình.
* **AWS CLI** hoạt động trên máy local.
* **Quy ước lab nhóm** đã soạn và được team thống nhất.
* Nhóm sẵn sàng học IAM tuần 3.
