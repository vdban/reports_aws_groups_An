---
title: "Week 3 - Worklog"
date: 2026-06-22
weight: 3
chapter: false
pre: " <b> 1.3. </b> "
---

### Week 3 goals:

* Learn IAM policy structure (Effect, Action, Resource, Condition).
* Write custom policy for **DynamoDB** — `GetItem`, `PutItem`, `Query`, `UpdateItem`.
* Write custom policy for **IoT publish** — `iot:Publish` on device topic.
* Attach policies to backend IAM user; verify with CLI.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Study IAM policy JSON syntax and least-privilege principle <br> - List actions `server.js` and Lambda will need on DynamoDB | 22/06/2026 | 22/06/2026 | <https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html> |
| 2 | - Draft `SmartHome-DynamoDB-Policy`: table ARN, index access <br> - Test attach policy; run `aws dynamodb list-tables` | 23/06/2026 | 23/06/2026 | <https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/iam-policy-example.html> |
| 3 | - Draft `SmartHome-IoT-Publish-Policy`: `iot:Publish` on `smarthome/*/telemetry` <br> - Restrict to team AWS account resources | 24/06/2026 | 24/06/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/iot-policies.html> |
| 4 | - Attach both policies to backend IAM user <br> - Validate DynamoDB write with `aws dynamodb put-item` (test table) | 25/06/2026 | 25/06/2026 | AWS Console / CLI |
| 5 | - Document policy ARNs in team wiki <br> - Align IoT topic pattern with firmware teammate | 26/06/2026 | 26/06/2026 | SmartHome_IoT repo |

### Week 3 outcomes:

* Custom IAM policies created for DynamoDB CRUD and IoT publish.
* Policies attached and verified via CLI — no excessive permissions.
* Topic ARN pattern agreed for MQTT bridge in later weeks.
* Backend IAM user ready for VPC and EC2 deployment.
