---
title: "Week 7 - Worklog"
date: 2026-07-20
weight: 7
chapter: false
pre: " <b> 1.7. </b> "
---

### Week 7 goals:

* Learn **DynamoDB**, **Lambda**, **API Gateway**, and **Cognito** (reference for architecture extension).
* I **lead module integration** for SmartHome_IoT: backend (Công) ↔ frontend (An) ↔ IoT/MQTT (Phúc).
* Verify sensor → RDS storage → actuator control flow on the dashboard.
* Internal demo and bug list before the final week.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Learn **DynamoDB**: table, partition/sort keys; compare NoSQL vs RDS for IoT use cases <br> - Note single-table extension path toward DynamoDB | 20/07/2026 | 20/07/2026 | <https://docs.aws.amazon.com/dynamodb/> |
| 2 | - Learn **Lambda** + **API Gateway**: serverless API model <br> - Run a lab function; evaluate partial REST backend replacement | 21/07/2026 | 21/07/2026 | <https://docs.aws.amazon.com/lambda/> <br> <https://docs.aws.amazon.com/apigateway/> |
| 3 | - Learn **Cognito**: User Pool, auth flows <br> - Review with An dashboard auth integration options | 22/07/2026 | 22/07/2026 | <https://docs.aws.amazon.com/cognito/> |
| 4 | - **Module integration:** backend API ↔ RDS schema (sensor updates, device commands) <br> - Connect React dashboard (An) to backend; Phúc tests ESP32 MQTT bridge → API | 23/07/2026 | 23/07/2026 | SmartHome_IoT `backend/`, `frontend/` |
| 5 | - End-to-end test: ESP32/MQTT → backend → RDS → UI <br> - **Internal team demo;** collect bug list; assign week 8 fixes | 24/07/2026 | 24/07/2026 | SmartHome_IoT repo |

### Week 7 outcomes:

* Solid lab-level understanding of **DynamoDB**, **Lambda**, **API Gateway**, **Cognito**.
* **SmartHome_IoT modules integrated** — backend, frontend, and IoT connected via API/MQTT.
* Core flow verified (sensor read/write, light/fan/door control).
* Bug list and completion plan ready for week 8.
