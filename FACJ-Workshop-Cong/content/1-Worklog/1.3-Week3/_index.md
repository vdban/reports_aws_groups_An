---
title: "Week 3 - Worklog"
date: 2026-06-22
weight: 3
chapter: false
pre: " <b> 1.3. </b> "
---

### Week 3 goals:

* Study **IAM** in depth: User, Group, Role, Policy, and least privilege.
* Practice custom policies and the IAM Policy Simulator.
* I **design IAM roles** for SmartHome_IoT components (EC2 backend, deploy, monitor).
* Team meeting: align naming conventions and permission matrix.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - IAM theory: User, Group, Role, Policy JSON <br> - Distinguish AuthN vs AuthZ on AWS | 22/06/2026 | 22/06/2026 | <https://docs.aws.amazon.com/IAM/> |
| 2 | - Create IAM Group/User for lab; attach managed policies <br> - Work with Quỳnh to review minimum DevOps permissions | 23/06/2026 | 23/06/2026 | <https://docs.aws.amazon.com/IAM/latest/UserGuide/access.html> |
| 3 | - Write custom IAM Policy (JSON) following least privilege <br> - Test with IAM Policy Simulator | 24/06/2026 | 24/06/2026 | <https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html> |
| 4 | - **Design IAM roles:** `smarthome-ec2-app`, `smarthome-deploy`, `smarthome-readonly-monitor` <br> - Document required S3/RDS/CloudWatch permissions per role | 25/06/2026 | 25/06/2026 | SmartHome_IoT repo |
| 5 | - **Team meeting:** review IAM matrix; align resource/IAM naming conventions <br> - Công confirms backend permissions; Quỳnh confirms deploy permissions | 26/06/2026 | 26/06/2026 | - |

### Week 3 outcomes:

* Solid understanding of IAM (User, Group, Role, Policy).
* **IAM roles for SmartHome_IoT** designed and reviewed with the team.
* Permission matrix and naming conventions agreed.
* Ready to design VPC networking in week 4.
