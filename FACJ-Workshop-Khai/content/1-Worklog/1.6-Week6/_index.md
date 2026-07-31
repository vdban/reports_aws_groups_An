---
title: "Week 6 - Worklog"
date: 2026-07-13
weight: 6
chapter: false
pre: " <b> 1.6. </b> "
---

### Week 6 goals:

* Design and create **DynamoDB single-table** schema for SmartHome entities.
* Implement repository layer in Node.js — `putSensorReading`, `getDeviceState`, `queryByUser`.
* Upload env config assets to **S3** (`.env.template`, deployment scripts).
* Enable **CloudWatch Logs** for backend and Lambda log groups.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Design single-table keys: `PK`/`SK` patterns (`USER#`, `DEVICE#`, `SENSOR#`) <br> - Create table `SmartHomeTable` with GSI for device lookup | 13/07/2026 | 13/07/2026 | <https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-general-nosql-design.html> |
| 2 | - Implement `repositories/dynamoRepository.js` — DocumentClient wrapper <br> - Add `putItem`, `query`, `updateItem` helpers | 14/07/2026 | 14/07/2026 | AWS SDK v3 `@aws-sdk/lib-dynamodb` |
| 3 | - Wire repository into `server.js` routes: `POST /api/sensors`, `GET /api/devices/:id` <br> - Seed sample items via script | 15/07/2026 | 15/07/2026 | SmartHome_IoT `backend/` |
| 4 | - Create S3 bucket `smarthome-env-assets`; upload `.env.template`, deploy shell script <br> - Block public access; IAM role read-only from EC2 | 16/07/2026 | 16/07/2026 | <https://docs.aws.amazon.com/s3/> |
| 5 | - Create CloudWatch log group `/smarthome/backend` <br> - Add Winston logger; stream API errors and MQTT events to CloudWatch | 17/07/2026 | 17/07/2026 | <https://docs.aws.amazon.com/cloudwatch/> |

### Week 6 outcomes:

* DynamoDB single-table live with repository module integrated.
* CRUD routes persist sensor and device data — verified via Postman.
* Env assets stored in S3; deployment script documented.
* CloudWatch captures backend logs for debugging in week 7.
