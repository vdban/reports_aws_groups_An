---
title: "Week 5 - Worklog"
date: 2026-07-06
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

### Week 5 goals:

* Launch **EC2** lab instance in VPC (public bastion or private + bastion).
* Create and **attach IAM Role** for EC2 (S3 read, CloudWatch logs) — no hardcoded keys on instance.
* Run **SSH hardening checklist**: disable password auth, key-only, update SG.
* **Stop instance** end-of-day lab procedure for cost savings.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - [ ] Create IAM Role `lab-ec2-role` + instance profile (S3, CloudWatch Logs) <br> - [ ] Launch EC2 Amazon Linux 2023, type `t3.micro` (Free Tier aware) | 06/07/2026 | 06/07/2026 | <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html> |
| 2 | - [ ] Attach IAM Role to EC2; verify metadata `curl` for temp creds <br> - [ ] Assign SG `lab-bastion-sg`; never open 22 to `0.0.0.0/0` | 07/07/2026 | 07/07/2026 | EC2 + IAM docs |
| 3 | - [ ] **SSH hardening checklist**: <br> &nbsp;&nbsp;- [ ] Key pair only, `PasswordAuthentication no` <br> &nbsp;&nbsp;- [ ] Disable root login <br> &nbsp;&nbsp;- [ ] Update `sshd_config`, restart sshd | 08/07/2026 | 08/07/2026 | Linux hardening guides |
| 4 | - [ ] Install CloudWatch agent (optional); test log shipping <br> - [ ] Document `aws ec2 stop-instances` + end-of-day stop schedule | 09/07/2026 | 09/07/2026 | CloudWatch Agent |
| 5 | - [ ] Hand off SSH access to backend team (bastion only) <br> - [ ] Team meeting: confirm EC2 ready for SmartHome_IoT trial deploy week 6 | 10/07/2026 | 10/07/2026 | SmartHome_IoT repo |

### Week 5 outcomes:

* [x] EC2 lab running in VPC; **IAM Role** attached successfully (no keys on disk).
* [x] **SSH hardening checklist** complete; SG does not expose SSH broadly.
* [x] **Stop EC2** end-of-day procedure documented — compute cost controlled.
* [x] Backend team can SSH via bastion securely.
* [x] Ready to provision S3/RDS in week 6.
