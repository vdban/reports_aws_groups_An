---
title: "Week 8 - Worklog"
date: 2026-07-27
weight: 8
chapter: false
pre: " <b> 1.8. </b> "
---

### Week 8 goals:

* **Orchestrate full AWS deploy** for SmartHome_IoT (VPC → EC2 → S3/RDS → Lambda → Cognito).
* Publish Hugo workshop site via **AWS Amplify** (`main` branch, Hugo build spec).
* **Cleanup unused resources**: stop EC2, snapshot RDS if needed, remove NAT/test buckets.
* Final cost report + security checklist before demo and internship submission.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - [ ] Write ordered deploy runbook: infra verify → Lambda deploy → Cognito env → smoke test <br> - [ ] Run orchestration pass 1; log failures on Slack | 27/07/2026 | 27/07/2026 | SmartHome_IoT repo / runbook |
| 2 | - [ ] Connect **FACJ-Workshop-quynh** repo to **Amplify Hosting** <br> - [ ] Configure Hugo build (`hugo --minify`); deploy preview URL for mentor | 28/07/2026 | 28/07/2026 | <https://docs.aws.amazon.com/amplify/> |
| 3 | - [ ] Fix deploy issues from pass 1; run orchestration pass 2 (full smoke test) <br> - [ ] Confirm CloudWatch dashboards + Budgets alerts still active post-deploy | 29/07/2026 | 29/07/2026 | CloudWatch / Budgets |
| 4 | - [ ] **Cleanup checklist**: <br> &nbsp;&nbsp;- [ ] Stop EC2 lab instances <br> &nbsp;&nbsp;- [ ] RDS stop or delete test instance (snapshot first) <br> &nbsp;&nbsp;- [ ] Release unused elastic IPs / NAT <br> &nbsp;&nbsp;- [ ] Review S3 lifecycle rules | 30/07/2026 | 30/07/2026 | Cost optimization guides |
| 5 | - [ ] Final **security + cost report** to mentor <br> - [ ] Demo SmartHome_IoT + Hugo site on Amplify; complete week 8 worklog | 31/07/2026 | 31/07/2026 | FCAJ Portal |

### Week 8 outcomes:

* [x] **Full AWS deploy orchestration** succeeded; smoke test passed.
* [x] Hugo workshop site live on **Amplify**; URL shared with mentor.
* [x] **Unused resources** stopped/removed; end-of-month cost within Budgets thresholds.
* [x] Final security checklist and cost report completed.
* [x] SmartHome_IoT internship — DevOps/AWS infra role — deliverables ready to **pass**.
