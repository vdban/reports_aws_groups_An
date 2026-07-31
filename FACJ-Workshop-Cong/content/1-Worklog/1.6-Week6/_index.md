---
title: "Week 6 - Worklog"
date: 2026-07-13
weight: 6
chapter: false
pre: " <b> 1.6. </b> "
---

### Week 6 goals:

* Learn **S3**, **RDS**, and **CloudWatch** (storage, relational DB, monitoring).
* **Start the SmartHome_IoT project** in parallel with AWS learning.
* I **finalize system architecture** and **design the DB schema** (single-table on RDS, DynamoDB as reference).
* Team meeting: assign modules and align integration plan.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Learn **S3**: bucket, object, IAM access; create `smarthome-assets` bucket <br> - Work with An to upload frontend static assets | 13/07/2026 | 13/07/2026 | <https://docs.aws.amazon.com/s3/> |
| 2 | - Learn **RDS**: instance, subnet group, security; create RDS in private subnet <br> - Quỳnh assists with DB security group configuration | 14/07/2026 | 14/07/2026 | <https://docs.aws.amazon.com/rds/> |
| 3 | - Learn **CloudWatch**: metrics, logs, alarms; create basic EC2/RDS alarms <br> - Review team **AWS Budgets** lab costs | 15/07/2026 | 15/07/2026 | <https://docs.aws.amazon.com/cloudwatch/> |
| 4 | - **Project:** analyze SmartHome_IoT repo (`frontend/`, `backend/`, ESP32 `code/`) <br> - Finalize target architecture diagram (VPC, EC2, S3, RDS, CloudWatch) | 16/07/2026 | 16/07/2026 | SmartHome_IoT repo |
| 5 | - **Design single-table DB schema** on RDS: `devices`, `sensor_readings`, `commands`, `users` <br> - **Team meeting:** lock architecture, schema; assign Công (API), An (UI), Phúc (MQTT) | 17/07/2026 | 17/07/2026 | SmartHome_IoT repo |

### Week 6 outcomes:

* Solid grasp of **S3**, **RDS**, **CloudWatch** for lab and project use.
* **SmartHome_IoT architecture** finalized and documented.
* **Single-table DB schema (RDS)** designed and reviewed with the team.
* Modules assigned; ready for integration and serverless/auth learning in week 7.
