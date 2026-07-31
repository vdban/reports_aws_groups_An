---
title: "Week 2 - Worklog"
date: 2026-06-15
weight: 2
chapter: false
pre: " <b> 1.2. </b> "
---

### Week 2 goals:

* Create an **AWS account** and set up basic security (Root MFA, IAM admin user).
* Configure **AWS Budgets** to monitor team lab costs.
* Install **AWS CLI** and practice basic commands.
* I document **team lab conventions** (resource naming, region, cost, security).

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Create AWS account; enable Root MFA <br> - Create IAM admin user (no daily Root usage) | 15/06/2026 | 15/06/2026 | <https://docs.aws.amazon.com/accounts/> |
| 2 | - Study Free Tier and billing model <br> - Create monthly **AWS Budget** with email cost alerts | 16/06/2026 | 16/06/2026 | <https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html> |
| 3 | - Install AWS CLI on Windows; run `aws configure` <br> - Verify with `aws sts get-caller-identity` | 17/06/2026 | 17/06/2026 | <https://docs.aws.amazon.com/cli/> |
| 4 | - Draft **Lab Conventions** (`smarthome-` prefix, `ap-southeast-1` region, stop/terminate rules) <br> - Share with Quỳnh (DevOps) and the team for alignment | 18/06/2026 | 18/06/2026 | SmartHome_IoT repo |
| 5 | - **Team meeting:** review lab conventions; sketch AWS stack for SmartHome_IoT <br> - Align on MVP scope (sensors, actuators, dashboard) | 19/06/2026 | 19/06/2026 | SmartHome_IoT repo |

### Week 2 outcomes:

* AWS account ready; Root MFA enabled.
* **AWS Budgets** and cost alerts configured.
* **AWS CLI** working on local machine.
* **Team lab conventions** documented and agreed by the team.
* Ready to study IAM in week 3.
