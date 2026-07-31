---
title: "Tuần 5 - Nhật ký công việc"
date: 2026-07-06
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

### Mục tiêu tuần 5:

* Launch và quản lý **Amazon EC2** trong VPC lab.
* Gắn **IAM Role for EC2** thay vì hard-code access key.
* Em **lập kế hoạch hosting backend** SmartHome_IoT trên EC2 (stack, env, chi phí).
* Họp nhóm: thống nhất chiến lược triển khai backend giai đoạn dự án.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Học EC2: AMI, instance type, key pair, EBS <br> - Launch t3.micro trong public subnet; Quỳnh hỗ trợ cấu hình | 06/07/2026 | 06/07/2026 | <https://docs.aws.amazon.com/ec2/> |
| 2 | - SSH vào instance; cài Node.js runtime cho backend Công <br> - Kiểm tra kết nối qua Security Group | 07/07/2026 | 07/07/2026 | <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html> |
| 3 | - Tạo **IAM Role for EC2** (`smarthome-ec2-app`); gắn quyền S3/CloudWatch tối thiểu <br> - Xác minh AWS CLI trên EC2 không cần static key | 08/07/2026 | 08/07/2026 | <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html> |
| 4 | - Soạn **Backend Hosting Strategy**: cấu hình env, reverse proxy, stop/start policy tiết kiệm chi phí <br> - Review với Công (backend) và Quỳnh (DevOps) | 09/07/2026 | 09/07/2026 | Repo SmartHome_IoT |
| 5 | - **Họp nhóm:** chốt EC2 làm host backend MVP; phân công module tuần 6 <br> - Checklist bảo mật (không commit key, dùng Role, stop khi không lab) | 10/07/2026 | 10/07/2026 | Repo SmartHome_IoT |

### Thành quả tuần 5:

* **EC2** lab truy cập được qua SSH trong VPC.
* **IAM Roles for EC2** áp dụng thành công — không dùng static key trên instance.
* **Kế hoạch hosting backend** đã soạn và thống nhất với nhóm.
* Sẵn sàng bắt đầu triển khai dự án và thiết kế DB từ tuần 6.
