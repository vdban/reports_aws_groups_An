---
title: "Week 8 - Worklog"
date: 2026-07-27
weight: 8
chapter: false
pre: " <b> 1.8. </b> "
---

### Week 8 goals:

* Deploy production **backend on EC2** — PM2 process manager, auto-restart.
* Fix bugs from week 7 integration (CORS, DynamoDB conditional writes, MQTT reconnect).
* Write **API README** — endpoints, request/response samples, env vars, deploy steps.
* Support team demo and finalize internship deliverables.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Install PM2; configure `ecosystem.config.js` for `server.js` <br> - Set PM2 startup on reboot | 27/07/2026 | 27/07/2026 | <https://pm2.keymetrics.io/> |
| 2 | - Fix CORS preflight on `POST /api/commands` <br> - Add retry logic for DynamoDB throttling | 28/07/2026 | 28/07/2026 | SmartHome_IoT `backend/` |
| 3 | - Fix MQTT client reconnect on EC2 network drop <br> - Re-run Postman suite — all green | 29/07/2026 | 29/07/2026 | Postman, CloudWatch |
| 4 | - Write `backend/API_README.md`: route table, JSON examples, `.env` keys, curl samples <br> - Export Postman collection to repo | 30/07/2026 | 30/07/2026 | SmartHome_IoT `backend/` |
| 5 | - Team demo: frontend → EC2 API → DynamoDB; firmware telemetry via MQTT bridge <br> - Hand off API docs to teammates; update worklog | 31/07/2026 | 31/07/2026 | - |

### Week 8 outcomes:

* Backend stable on EC2 with PM2 — survives reboot.
* Integration bugs fixed; API tests pass on EC2 and API Gateway.
* `API_README.md` published with full endpoint documentation.
* SmartHome_IoT backend deliverable complete; ready for internship report.
