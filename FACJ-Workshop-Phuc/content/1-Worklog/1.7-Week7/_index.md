---
title: "Week 7 - Worklog"
date: 2026-07-20
weight: 7
chapter: false
pre: " <b> 1.7. </b> "
---

### Week 7 goals:

* Deploy **Cognito User Pool** + app client for SmartHome_IoT auth.
* Support team **Lambda deploy** (IAM role, env vars, CloudWatch log group).
* Run full-stack **security review**: IAM, SG, S3 public block, Cognito password policy.
* Verify CloudWatch logs/alerts when Lambda error rate increases.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - [ ] Create Cognito User Pool: email sign-in, strong password policy, optional MFA <br> - [ ] Create app client (no secret for SPA); configure lab callback URLs | 20/07/2026 | 20/07/2026 | <https://docs.aws.amazon.com/cognito/> |
| 2 | - [ ] IAM role `lab-lambda-role`: logs + minimal DynamoDB/S3 <br> - [ ] Support backend Lambda deploy via CLI/Console; create log group `/aws/lambda/smarthome-*` | 21/07/2026 | 21/07/2026 | Lambda + IAM docs |
| 3 | - [ ] Test Cognito sign-up/sign-in flow with frontend <br> - [ ] Document env vars (User Pool ID, Client ID) for team — no hardcoded secrets | 22/07/2026 | 22/07/2026 | Cognito + Amplify auth guides |
| 4 | - [ ] **Security review checklist**: <br> &nbsp;&nbsp;- [ ] IAM least privilege re-scan <br> &nbsp;&nbsp;- [ ] S3 public access blocked <br> &nbsp;&nbsp;- [ ] RDS not public <br> &nbsp;&nbsp;- [ ] Cognito token expiry reasonable | 23/07/2026 | 23/07/2026 | AWS Security Hub / internal checklist |
| 5 | - [ ] CloudWatch alarm Lambda Errors > 0 in 5 minutes <br> - [ ] Team meeting: auth + Lambda ready for week 8 deploy orchestration | 24/07/2026 | 24/07/2026 | SmartHome_IoT repo |

### Week 7 outcomes:

* [x] **Cognito User Pool** and app client working; frontend login verified.
* [x] Lambda deploy support complete; log groups and IAM role standardized.
* [x] **Security review** passed checklist; no public RDS/S3 exposure.
* [x] CloudWatch alarm catches Lambda errors.
* [x] Auth + compute stack ready for full deploy orchestration in week 8.
