---
title: "Week 4 - Worklog"
date: 2026-06-29
weight: 4
chapter: false
pre: " <b> 1.4. </b> "
---

### Week 4 goals:

* Study **VPC**: public/private subnets, route tables, Internet Gateway, Security Groups.
* Build a VPC lab following team conventions.
* I **draw the target architecture network diagram** for SmartHome_IoT (public API, private DB, IoT ingress).
* Team meeting to review before EC2 planning in week 5.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Learn VPC, CIDR, Availability Zones, public/private subnets | 29/06/2026 | 29/06/2026 | <https://docs.aws.amazon.com/vpc/> |
| 2 | - Create VPC lab `smarthome-vpc` + public/private subnets <br> - Attach Internet Gateway and public routes; work with Quỳnh on deployment | 30/06/2026 | 30/06/2026 | <https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html> |
| 3 | - Configure Security Groups (SSH, HTTP/HTTPS, API port) <br> - Compare Security Group vs NACL; document MQTT/API ports | 01/07/2026 | 01/07/2026 | <https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html> |
| 4 | - **Draw target network architecture:** frontend (An), backend EC2 (Công), private RDS, IoT/MQTT (Phúc) <br> - Export diagram for workshop documentation | 02/07/2026 | 02/07/2026 | SmartHome_IoT repo |
| 5 | - **Team meeting:** finalize CIDR `10.0.0.0/16`, Security Group conventions <br> - Pre-EC2 checklist and backend hosting plan for week 5 | 03/07/2026 | 03/07/2026 | - |

### Week 4 outcomes:

* **VPC** lab running with public/private subnets and Internet access.
* **Target network architecture diagram** completed and aligned with the team.
* Security Groups and traffic flows (API, DB, IoT) clearly documented.
* Ready to plan EC2 backend hosting in week 5.
