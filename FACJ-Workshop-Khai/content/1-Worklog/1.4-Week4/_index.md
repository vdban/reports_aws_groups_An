---
title: "Week 4 - Worklog"
date: 2026-06-29
weight: 4
chapter: false
pre: " <b> 1.4. </b> "
---

### Week 4 goals:

* Learn VPC basics — subnets, route tables, internet gateway.
* Configure **Security Group** for backend API traffic.
* Open inbound ports **3000** (Express dev) and **8080** (alt/proxy) from allowed sources.
* Test TCP reachability before EC2 backend deployment.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Review VPC layout in team AWS account <br> - Identify subnet for EC2 backend instance | 29/06/2026 | 29/06/2026 | <https://docs.aws.amazon.com/vpc/> |
| 2 | - Create Security Group `sg-smarthome-api` <br> - Add inbound rule: TCP 3000 from team IP / frontend SG | 30/06/2026 | 30/06/2026 | AWS Console — EC2 Security Groups |
| 3 | - Add inbound rule: TCP 8080 for reverse proxy or health check <br> - Restrict SSH (22) to admin IP only | 01/07/2026 | 01/07/2026 | VPC best practices |
| 4 | - Attach SG to test EC2 instance <br> - Curl `http://<public-ip>:3000/health` from local machine | 02/07/2026 | 02/07/2026 | `curl`, SmartHome_IoT `backend/` |
| 5 | - Document SG rules in repo README draft <br> - Align port plan with frontend API base URL config | 03/07/2026 | 03/07/2026 | SmartHome_IoT repo |

### Week 4 outcomes:

* Security Group configured for API ports 3000 and 8080.
* Inbound rules follow least exposure — no open `0.0.0.0/0` on API ports.
* Port connectivity verified on test instance.
* Network layer ready for EC2 backend setup in week 5.
