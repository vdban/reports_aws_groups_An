---
title: "Week 4 - Worklog"
date: 2026-06-29
weight: 4
chapter: false
pre: " <b> 1.4. </b> "
---

### Week 4 goals:

* Learn **VPC**: subnet, route table, Internet Gateway, Security Group.
* Draw and understand the **device-to-cloud data path**: ESP32 (WiFi) → Internet → IoT Core endpoint.
* Distinguish network-layer security (SG/NACL) vs device **IoT policy**.
* Build a mental model before EC2 MQTT testing next week.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Study VPC: CIDR, public/private subnet, route table <br> - Create a simple lab VPC in console | 29/06/2026 | 29/06/2026 | <https://docs.aws.amazon.com/vpc/> |
| 2 | - Internet Gateway, NAT (concepts); outbound traffic from private subnet <br> - Note IoT Core is managed — device is not inside the lab VPC | 30/06/2026 | 30/06/2026 | <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html> |
| 3 | - Draw diagram: **ESP32 on breadboard** → WiFi router → Internet → **AWS IoT Core** (port 8883 MQTT/TLS) | 01/07/2026 | 01/07/2026 | SmartHome_IoT architecture notes |
| 4 | - Compare Security Group (EC2 backend next week) vs IoT policy (ESP32) <br> - List common failure points: DNS, expired cert, wrong region endpoint | 02/07/2026 | 02/07/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/transport-security.html> |
| 5 | - Team meeting: review device-to-cloud diagram; backend on EC2 in VPC, firmware connects directly to IoT Core <br> - I confirm ESP32 only needs WiFi + cert, no VPN | 03/07/2026 | 03/07/2026 | SmartHome_IoT repo |

### Week 4 outcomes:

* Basic **VPC** understanding and IGW/route table role.
* Clear **device-to-cloud diagram** for SmartHome_IoT (ESP32 → IoT Core).
* Can distinguish VPC security (EC2) vs IoT policy (device).
* Ready for EC2 MQTT test and Thing/certificate lab in week 5.
