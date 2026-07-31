---
title: "Week 5 - Worklog"
date: 2026-07-06
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

### Week 5 goals:

* Launch EC2 instance for backend development.
* Install **Node.js** (LTS) and `npm install` project dependencies.
* Run `server.js` locally on EC2 — bind port 3000.
* Attach **IAM Role** to EC2 for DynamoDB and IoT access (no hardcoded keys).

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Launch EC2 (Amazon Linux 2023); attach `sg-smarthome-api` <br> - SSH in; update packages | 06/07/2026 | 06/07/2026 | <https://docs.aws.amazon.com/ec2/> |
| 2 | - Install Node.js LTS via `nvm` or package manager <br> - Verify `node -v`, `npm -v` | 07/07/2026 | 07/07/2026 | <https://nodejs.org/> |
| 3 | - Clone repo; `npm install` in `backend/` <br> - Copy `.env.example` → `.env`; set `PORT=3000` | 08/07/2026 | 08/07/2026 | SmartHome_IoT `backend/` |
| 4 | - Create IAM Role with DynamoDB + IoT policies; attach to EC2 <br> - Remove static AWS keys from `.env` on instance | 09/07/2026 | 09/07/2026 | <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html> |
| 5 | - Run `node server.js`; test `GET /health`, `GET /api/sensors` locally and via public IP <br> - Fix CORS headers for frontend origin | 10/07/2026 | 10/07/2026 | Postman, `curl` |

### Week 5 outcomes:

* EC2 running Node.js; backend starts without errors.
* IAM Role supplies AWS credentials — no keys in source code.
* API responds on port 3000 from external client.
* Local dev workflow on EC2 established for week 6 schema work.
