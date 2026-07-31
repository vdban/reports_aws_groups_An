---
title: "Week 3 - Worklog"
date: 2026-06-22
weight: 3
chapter: false
pre: " <b> 1.3. </b> "
---

### Week 3 goals:

* Create **IAM users/groups** for the SmartHome_IoT lab team (least privilege).
* Assign permissions by role: DevOps, Backend, Frontend, IoT.
* Security checklist: MFA for admins, access key rotation policy, no wildcard `*` on production actions.
* Document user → group → policy mapping table.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - [ ] Design IAM structure: groups `lab-devops`, `lab-backend`, `lab-frontend`, `lab-readonly` <br> - [ ] Review minimum policies per group | 22/06/2026 | 22/06/2026 | <https://docs.aws.amazon.com/IAM/latest/UserGuide/> |
| 2 | - [ ] Create IAM users for each teammate; assign matching groups <br> - [ ] Enforce **MFA** for DevOps/admin users | 23/06/2026 | 23/06/2026 | IAM Console |
| 3 | - [ ] Attach managed/custom policies: EC2 read-only for frontend, Lambda/S3 for backend <br> - [ ] Deny policy: block resource creation outside lab region | 24/06/2026 | 24/06/2026 | IAM Policy docs |
| 4 | - [ ] Issue new access keys; guide team to update `aws configure` <br> - [ ] Delete old/unused keys (security checklist) | 25/06/2026 | 25/06/2026 | AWS CLI |
| 5 | - [ ] Publish IAM mapping table to repo wiki/Slack <br> - [ ] Team meeting: confirm permissions sufficient for week 4 (VPC build) | 26/06/2026 | 26/06/2026 | SmartHome_IoT repo |

### Week 3 outcomes:

* [x] Lab team IAM users/groups created with **least privilege**.
* [x] MFA enabled for admin/DevOps; old access keys revoked.
* [x] Deny policy blocks wrong-region resources — reduces cost risk.
* [x] User → group → policy mapping documented.
* [x] Team ready to build VPC in week 4.
