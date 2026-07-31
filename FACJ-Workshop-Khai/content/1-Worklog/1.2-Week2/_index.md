---
title: "Week 2 - Worklog"
date: 2026-06-15
weight: 2
chapter: false
pre: " <b> 1.2. </b> "
---

### Week 2 goals:

* Install and configure **AWS CLI** on local machine.
* Run `aws configure` with access key, secret, region (`ap-southeast-1`).
* Verify identity with `aws sts get-caller-identity`.
* Test basic CLI commands for later DynamoDB and Lambda deployment.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Install AWS CLI v2 on Windows <br> - Verify `aws --version` | 15/06/2026 | 15/06/2026 | <https://docs.aws.amazon.com/cli/> |
| 2 | - Run `aws configure`; set default region and output format (json) <br> - Store credentials securely; avoid committing to repo | 16/06/2026 | 16/06/2026 | Team AWS account |
| 3 | - Execute `aws sts get-caller-identity` — confirm Account, UserId, Arn <br> - Screenshot output for worklog | 17/06/2026 | 17/06/2026 | <https://docs.aws.amazon.com/cli/latest/reference/sts/get-caller-identity.html> |
| 4 | - Try `aws iam list-users`, `aws s3 ls` to validate permissions <br> - Note which actions need custom IAM policy later | 18/06/2026 | 18/06/2026 | AWS CLI reference |
| 5 | - Document CLI setup steps in personal notes <br> - Plan IAM policies for DynamoDB and IoT (week 3) | 19/06/2026 | 19/06/2026 | - |

### Week 2 outcomes:

* AWS CLI installed and configured on dev machine.
* `aws sts get-caller-identity` returns valid caller — CLI auth works.
* Basic read commands tested; permission gaps identified for week 3.
* Ready to attach custom IAM policies for backend services.
