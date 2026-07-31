---
title: "Week 5 - Worklog"
date: 2026-07-06
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

### Week 5 goals:

* Learn **EC2** at the frontend level: instances, public IP, security groups for API ports.
* Understand the backend **API endpoint** (REST) to prepare React dashboard integration.
* Test API calls with Postman/fetch; document JSON response format for UI rendering.
* Team meeting: align on the API contract between frontend and backend.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Study EC2: instance types, AMI, key pairs, Elastic IP <br> - Inspect the team's backend EC2; note public IP/DNS and API port | 06/07/2026 | 06/07/2026 | <https://docs.aws.amazon.com/ec2/> |
| 2 | - Learn Security Group inbound rules for API port (e.g. 8080/443) <br> - Understand frontend (S3) calls HTTPS endpoint, no SSH into EC2 | 07/07/2026 | 07/07/2026 | <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html> |
| 3 | - Test `GET /sensors` via Postman; inspect JSON structure (temperature, humidity, door_status) <br> - Note which fields appear on cards vs trigger alerts | 08/07/2026 | 08/07/2026 | Postman / team Swagger |
| 4 | - Try `POST /devices/control` with JSON body; check success/error responses <br> - Sketch UX loading states and error toasts for API timeouts | 09/07/2026 | 09/07/2026 | Postman |
| 5 | - Team meeting: finalize API contract (endpoints, methods, JSON schema) for frontend <br> - Create API → UI component mapping table (sensor card, toggle switch) | 10/07/2026 | 10/07/2026 | SmartHome_IoT repo |

### Week 5 outcomes:

* Understanding of **EC2** and how the backend exposes API endpoints to the frontend.
* API tested via Postman; clear on data format for dashboard display.
* **API → UI component** mapping table ready for React implementation in week 7.
* Team aligned on API contract; ready for detailed Figma design in week 6.
