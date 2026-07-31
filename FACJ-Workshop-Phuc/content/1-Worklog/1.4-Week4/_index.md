---
title: "Week 4 - Worklog"
date: 2026-06-29
weight: 4
chapter: false
pre: " <b> 1.4. </b> "
---

### Week 4 goals:

* Build **lab VPC** for SmartHome_IoT: VPC, public/private subnets, IGW, route tables.
* Configure **Security Groups** (SSH from lab IP only, HTTP/HTTPS for app tier).
* Tag resources (`Project=SmartHome`, `Env=lab`) for cost tracking.
* Document network diagram and pre-EC2 checklist.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - [ ] Create VPC `10.0.0.0/16` in `ap-southeast-1` <br> - [ ] Create public subnet (`10.0.1.0/24`) + private subnet (`10.0.2.0/24`) across 2 AZs | 29/06/2026 | 29/06/2026 | <https://docs.aws.amazon.com/vpc/> |
| 2 | - [ ] Attach Internet Gateway; configure public route table → IGW <br> - [ ] Private subnet: route via NAT (or note cost trade-off if NAT not enabled yet) | 30/06/2026 | 30/06/2026 | VPC User Guide |
| 3 | - [ ] Create SG `lab-bastion-sg`: SSH (22) from office/lab IP only <br> - [ ] Create SG `lab-app-sg`: 80/443 from bastion or ALB (prep for week 5) | 01/07/2026 | 01/07/2026 | Security Groups docs |
| 4 | - [ ] Apply cost allocation tags; verify in Cost Explorer filter by tag <br> - [ ] Security checklist: do not attach default SG directly | 02/07/2026 | 02/07/2026 | AWS Cost Allocation Tags |
| 5 | - [ ] Upload VPC diagram to repo; pre-EC2 checklist review with mentor <br> - [ ] Team meeting: confirm subnet placement for EC2/RDS weeks 5–6 | 03/07/2026 | 03/07/2026 | SmartHome_IoT repo |

### Week 4 outcomes:

* [x] Lab **VPC** with public/private subnets and IGW operational.
* [x] **Security Groups** lock down SSH; app tier isolated.
* [x] Standard resource tagging — cost tracking by project enabled.
* [x] Network diagram and pre-EC2 checklist documented.
* [x] Ready to launch EC2 + IAM Role in week 5.
