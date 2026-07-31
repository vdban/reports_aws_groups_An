---
title: "Week 6 - Worklog"
date: 2026-07-13
weight: 6
chapter: false
pre: " <b> 1.6. </b> "
---

### Week 6 goals:

* Provision **S3** lab bucket (versioning, block public access) for SmartHome_IoT artifacts.
* Deploy **RDS** lab (MySQL/PostgreSQL) in private subnet; SG allows EC2 app only.
* Set up **CloudWatch alarms** (EC2 CPU, RDS storage, billing anomaly).
* **Review AWS Budgets** — compare forecast vs actual; adjust thresholds if needed.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - [ ] Create S3 `smarthome-lab-artifacts-<account>`; enable block public access <br> - [ ] Lifecycle rule: delete test objects after 30 days (cost control) | 13/07/2026 | 13/07/2026 | <https://docs.aws.amazon.com/s3/> |
| 2 | - [ ] Launch RDS `db.t3.micro` in private subnet; SG `lab-rds-sg` from `lab-app-sg` only <br> - [ ] Store master password in Secrets Manager (never commit to repo) | 14/07/2026 | 14/07/2026 | <https://docs.aws.amazon.com/rds/> |
| 3 | - [ ] CloudWatch alarm: EC2 CPU > 80% for 5 min → SNS notify DevOps <br> - [ ] RDS free storage < 2GB alarm; daily billing spend spike alarm | 15/07/2026 | 15/07/2026 | <https://docs.aws.amazon.com/cloudwatch/> |
| 4 | - [ ] **Budgets review**: open Cost Explorer, compare July forecast vs 80%/100% budget <br> - [ ] Note top cost services; plan RDS stop outside lab hours if needed | 16/07/2026 | 16/07/2026 | AWS Budgets / Cost Explorer |
| 5 | - [ ] Hand off connection string (Slack DM / Secrets Manager) to backend <br> - [ ] Team meeting: S3/RDS/alarms infra ready for SmartHome_IoT integration | 17/07/2026 | 17/07/2026 | SmartHome_IoT repo |

### Week 6 outcomes:

* [x] **S3** lab bucket secured; lifecycle rule reduces storage cost.
* [x] **RDS** lab in private subnet; credentials in Secrets Manager.
* [x] **CloudWatch alarms** for CPU/storage/billing configured.
* [x] **Budgets review** complete; know which services to stop when not in lab.
* [x] Backend team can connect to DB; ready for Cognito in week 7.
