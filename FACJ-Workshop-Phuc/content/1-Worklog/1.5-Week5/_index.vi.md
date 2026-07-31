---
title: "Tuần 5 - Nhật ký công việc"
date: 2026-07-06
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

### Mục tiêu tuần 5:

* Launch **EC2** lab instance trong VPC (public subnet bastion hoặc private + bastion).
* Tạo và **attach IAM Role** cho EC2 (S3 read, CloudWatch logs) — không hardcode key trên instance.
* Thực hiện **SSH hardening checklist**: disable password auth, key-only, cập nhật SG.
* Quy trình **stop instance** cuối ngày lab để tiết kiệm chi phí.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - [ ] Tạo IAM Role `lab-ec2-role` + instance profile (S3, CloudWatch Logs) <br> - [ ] Launch EC2 Amazon Linux 2023, type `t3.micro` (Free Tier aware) | 06/07/2026 | 06/07/2026 | <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html> |
| 2 | - [ ] Attach IAM Role vào EC2; verify metadata `curl` lấy creds tạm <br> - [ ] Gán SG `lab-bastion-sg`; không mở 22 ra `0.0.0.0/0` | 07/07/2026 | 07/07/2026 | EC2 + IAM docs |
| 3 | - [ ] **SSH hardening checklist**: <br> &nbsp;&nbsp;- [ ] Key pair only, `PasswordAuthentication no` <br> &nbsp;&nbsp;- [ ] Disable root login <br> &nbsp;&nbsp;- [ ] Cập nhật `sshd_config`, restart sshd | 08/07/2026 | 08/07/2026 | Linux hardening guides |
| 4 | - [ ] Cài CloudWatch agent (optional); test gửi log <br> - [ ] Document lệnh `aws ec2 stop-instances` + lịch stop cuối ngày | 09/07/2026 | 09/07/2026 | CloudWatch Agent |
| 5 | - [ ] Handoff SSH access cho backend team (chỉ qua bastion) <br> - [ ] Họp nhóm: xác nhận EC2 đủ cho deploy thử SmartHome_IoT tuần 6 | 10/07/2026 | 10/07/2026 | Repo SmartHome_IoT |

### Thành quả tuần 5:

* [x] EC2 lab chạy trong VPC; **IAM Role** attach thành công (no keys on disk).
* [x] **SSH hardening checklist** hoàn tất; SG không expose SSH public rộng.
* [x] Quy trình **stop EC2** cuối ngày document — kiểm soát chi phí compute.
* [x] Backend team có thể SSH qua bastion an toàn.
* [x] Sẵn sàng provision S3/RDS tuần 6.
