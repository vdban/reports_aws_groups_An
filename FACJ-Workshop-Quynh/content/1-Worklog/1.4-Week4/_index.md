---
title: "Week 4 - Worklog"
date: 2026-06-29
weight: 4
chapter: false
pre: " <b> 1.4. </b> "
---

### Week 4 goals:

* Learn **VPC** at a high level (subnets, route tables, security groups) to understand where the backend runs.
* Create **paper wireframes** for the dashboard: layout, information hierarchy, widget placement.
* Define navigation structure and responsive breakpoints for mobile/tablet.
* Team meeting: review wireframes and collect user experience feedback.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Study VPC: CIDR, public/private subnets, Internet Gateway, NAT <br> - Note backend EC2 lives in private subnet; frontend calls API via public endpoint | 29/06/2026 | 29/06/2026 | <https://docs.aws.amazon.com/vpc/> |
| 2 | - Learn Security Group vs NACL; understand why frontend does not enter VPC directly <br> - Draw simple diagram: User → S3 (React) → API Gateway/EC2 | 30/06/2026 | 30/06/2026 | <https://cloudjourney.awsstudygroup.com/> |
| 3 | - **Paper wireframe**: header (logo, user menu), sidebar navigation, sensor card area <br> - Focus on visual hierarchy: key metrics (temperature, open door) stand out | 01/07/2026 | 01/07/2026 | Paper / pen |
| 4 | - Extend wireframe: light/fan control panel, door alert notification area <br> - Sketch mobile layout: stacked cards, touch-friendly control buttons | 02/07/2026 | 02/07/2026 | Paper / pen |
| 5 | - Team meeting: present wireframes; feedback on red alert color for open door, intuitive icons <br> - Update wireframe v2 based on UX suggestions | 03/07/2026 | 03/07/2026 | SmartHome_IoT repo |

### Week 4 outcomes:

* Sufficient **VPC** understanding to know frontend connects to backend via public API.
* Completed **paper dashboard wireframes** with clear, readable layout.
* Navigation and basic mobile responsiveness defined.
* Wireframe v2 reviewed by the team; ready to move to Figma in week 6.
