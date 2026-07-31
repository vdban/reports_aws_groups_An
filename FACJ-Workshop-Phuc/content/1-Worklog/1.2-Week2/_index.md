---
title: "Week 2 - Worklog"
date: 2026-06-15
weight: 2
chapter: false
pre: " <b> 1.2. </b> "
---

### Week 2 goals:

* I **own** **AWS Budgets** and billing alert setup for the lab account.
* Configure cost thresholds; document the process when budget is exceeded.
* Install **AWS CLI** on every teammate's machine; verify identity per person.
* Security checklist: Root MFA, no daily Root usage.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - [ ] Audit lab AWS account: confirm Root MFA enabled <br> - [ ] Create IAM admin user; disable Root access keys | 15/06/2026 | 15/06/2026 | <https://docs.aws.amazon.com/accounts/> |
| 2 | - [ ] Create monthly **AWS Budget** (80% / 100% thresholds) <br> - [ ] Attach SNS/email alerts for billing notifications | 16/06/2026 | 16/06/2026 | <https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html> |
| 3 | - [ ] Write short runbook: on alert → check Cost Explorer → **stop** unused EC2/RDS <br> - [ ] Share runbook on team Slack | 17/06/2026 | 17/06/2026 | AWS Cost Explorer |
| 4 | - [ ] Install AWS CLI (Windows/macOS) on each teammate's machine <br> - [ ] Guide `aws configure`; verify `aws sts get-caller-identity` | 18/06/2026 | 18/06/2026 | <https://docs.aws.amazon.com/cli/> |
| 5 | - [ ] CLI checklist: 100% teammates pass verify <br> - [ ] Team meeting: agree on region `ap-southeast-1` and no off-lab resources | 19/06/2026 | 19/06/2026 | SmartHome_IoT repo |

### Week 2 outcomes:

* [x] **AWS Budgets** and billing alerts live; 80%/100% thresholds configured.
* [x] Budget overrun runbook + **stop resource** rules documented.
* [x] **AWS CLI** installed and verified on all team machines.
* [x] Security checklist: Root MFA, IAM admin for daily use only.
* [x] Region and lab naming convention agreed for week 3 (IAM).
