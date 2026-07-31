---
title: "Tuần 3 - Nhật ký công việc"
date: 2026-06-22
weight: 3
chapter: false
pre: " <b> 1.3. </b> "
---

### Mục tiêu tuần 3:

* Tìm hiểu sâu **IAM**: User, Group, Role, Policy và nguyên tắc least privilege.
* Thực hành policy tùy chỉnh và IAM Policy Simulator.
* Em **thiết kế IAM roles** cho các thành phần SmartHome_IoT (EC2 backend, deploy, monitor).
* Họp nhóm: thống nhất quy ước đặt tên và ma trận phân quyền.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Lý thuyết IAM: User, Group, Role, Policy JSON <br> - Phân biệt AuthN và AuthZ trên AWS | 22/06/2026 | 22/06/2026 | <https://docs.aws.amazon.com/IAM/> |
| 2 | - Tạo IAM Group/User lab; gắn managed policy <br> - Phối hợp Quỳnh rà soát quyền tối thiểu cho DevOps | 23/06/2026 | 23/06/2026 | <https://docs.aws.amazon.com/IAM/latest/UserGuide/access.html> |
| 3 | - Viết IAM Policy tùy chỉnh (JSON) theo least privilege <br> - Test bằng IAM Policy Simulator | 24/06/2026 | 24/06/2026 | <https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html> |
| 4 | - **Thiết kế IAM roles:** `smarthome-ec2-app`, `smarthome-deploy`, `smarthome-readonly-monitor` <br> - Ghi chú quyền S3/RDS/CloudWatch cần thiết cho từng role | 25/06/2026 | 25/06/2026 | Repo SmartHome_IoT |
| 5 | - **Họp nhóm:** review ma trận IAM; thống nhất quy ước đặt tên resource/IAM <br> - Công xác nhận quyền backend; Quỳnh xác nhận quyền deploy | 26/06/2026 | 26/06/2026 | - |

### Thành quả tuần 3:

* Nắm vững mô hình IAM (User, Group, Role, Policy).
* **IAM roles cho SmartHome_IoT** đã thiết kế và review với nhóm.
* Ma trận phân quyền và quy ước đặt tên đã thống nhất.
* Sẵn sàng thiết kế mạng VPC tuần 4.
