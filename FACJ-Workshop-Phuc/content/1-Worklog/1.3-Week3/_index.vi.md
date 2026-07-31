---
title: "Tuần 3 - Nhật ký công việc"
date: 2026-06-22
weight: 3
chapter: false
pre: " <b> 1.3. </b> "
---

### Mục tiêu tuần 3:

* Tạo **IAM users/groups** cho lab team SmartHome_IoT (least privilege).
* Phân quyền theo vai trò: DevOps, Backend, Frontend, IoT.
* Security checklist: MFA cho admin, rotate access key policy, no wildcard `*` trên production actions.
* Document bảng mapping user → group → policy.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - [ ] Thiết kế cấu trúc IAM: groups `lab-devops`, `lab-backend`, `lab-frontend`, `lab-readonly` <br> - [ ] Review policy tối thiểu cho từng group | 22/06/2026 | 22/06/2026 | <https://docs.aws.amazon.com/IAM/latest/UserGuide/> |
| 2 | - [ ] Tạo IAM users cho từng thành viên; gán group tương ứng <br> - [ ] Bật **MFA** bắt buộc cho user DevOps/admin | 23/06/2026 | 23/06/2026 | IAM Console |
| 3 | - [ ] Attach managed/custom policies: EC2 read-only cho frontend, Lambda/S3 cho backend <br> - [ ] Deny policy: không cho tạo resource ngoài region lab | 24/06/2026 | 24/06/2026 | IAM Policy docs |
| 4 | - [ ] Phát access key mới; hướng dẫn team cập nhật `aws configure` <br> - [ ] Xóa key cũ / key không dùng (security checklist) | 25/06/2026 | 25/06/2026 | AWS CLI |
| 5 | - [ ] Publish bảng IAM mapping lên repo wiki/Slack <br> - [ ] Họp nhóm: confirm quyền đủ cho tuần 4 (VPC build) | 26/06/2026 | 26/06/2026 | Repo SmartHome_IoT |

### Thành quả tuần 3:

* [x] IAM users/groups lab team đã tạo theo **least privilege**.
* [x] MFA bật cho admin/DevOps; access key cũ đã revoke.
* [x] Deny policy chặn tạo resource sai region — giảm rủi ro chi phí.
* [x] Bảng mapping user → group → policy được document.
* [x] Team sẵn sàng dựng VPC tuần 4.
