---
title: "Week 2 - Worklog"
date: 2026-06-15
weight: 2
chapter: false
pre: " <b> 1.2. </b> "
---

### Week 2 goals:

* **Create an AWS account** (Root MFA, IAM admin user) and set up **AWS Budgets**.
* Create an **Adafruit IO** account; learn **MQTT feeds** for sensors and actuators.
* Trial publish/subscribe from the Adafruit dashboard; understand username/key and broker `io.adafruit.com`.
* Team meeting: agree on temporary feed/topic names before moving to AWS IoT Core.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Create AWS account; enable Root MFA; create IAM admin user | 15/06/2026 | 15/06/2026 | <https://docs.aws.amazon.com/accounts/> |
| 2 | - Study Free Tier and billing <br> - Create monthly **AWS Budget** with email alerts | 16/06/2026 | 16/06/2026 | <https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html> |
| 3 | - Sign up for **Adafruit IO**; create feeds: `temperature`, `humidity`, `light`, `fan`, `light-switch`, `door` | 17/06/2026 | 17/06/2026 | <https://io.adafruit.com/api/docs> |
| 4 | - Learn Adafruit MQTT: publish test values from web UI; subscribe to a feed with an MQTT client <br> - Note `username/feeds/<feed-key>` topic format | 18/06/2026 | 18/06/2026 | <https://io.adafruit.com/api/docs/mqtt> |
| 5 | - Team meeting: map Adafruit feeds ↔ ESP32 firmware payload fields <br> - I demo simulated temperature publish from Serial Monitor to a feed | 19/06/2026 | 19/06/2026 | SmartHome_IoT repo `firmware/` |

### Week 2 outcomes:

* AWS account ready; Root MFA and **AWS Budgets** configured.
* **Adafruit IO feeds** created; I understand basic MQTT publish/subscribe flow.
* Feed ↔ firmware variable mapping documented for backend/dashboard teammates.
* Ready to study IAM IoT policies and IoT Core in week 3.
