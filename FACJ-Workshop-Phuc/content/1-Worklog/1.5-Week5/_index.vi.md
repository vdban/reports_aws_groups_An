---
title: "Tuần 5 - Nhật ký công việc"
date: 2026-07-06
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

### Mục tiêu tuần 5:

* Launch EC2 lab; attach IAM Role; SSH hardening.
* Quy trình stop instance cuối ngày.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Tạo IAM Role cho EC2 (S3 read, CloudWatch logs); launch t3.micro. | 06/07/2026 | 06/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 2 | - Attach role; verify metadata credential; gán SG bastion. | 07/07/2026 | 07/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 3 | - SSH hardening: key-only, disable password, disable root login. | 08/07/2026 | 08/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 4 | - Document stop instance cuối ngày; nhắc nhóm trên Slack. | 09/07/2026 | 09/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 5 | - Handoff SSH access cho backend qua bastion an toàn. | 10/07/2026 | 10/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |

### Thành quả tuần 5:

* EC2 lab chạy trong VPC; IAM Role attach OK.
* SSH hardening xong; quy trình stop document.
