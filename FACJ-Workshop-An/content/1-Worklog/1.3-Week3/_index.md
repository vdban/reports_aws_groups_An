---
title: "Week 3 - Worklog"
date: 2026-06-22
weight: 3
chapter: false
pre: " <b> 1.3. </b> "
---

### Week 3 goals:

* Learn **IAM** for IoT: users, policies, least privilege.
* Understand **AWS IoT Core** concepts: Thing, certificate, IoT policy, endpoint.
* Write/trial **IoT policy JSON** allowing device publish/subscribe on lab topics.
* Compare Adafruit IO vs IoT Core to prepare ESP32 firmware migration to AWS.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Study IAM: user, group, policy, Access Key <br> - Create lab IAM user; avoid daily Root use | 22/06/2026 | 22/06/2026 | <https://docs.aws.amazon.com/iam/> |
| 2 | - Intro to **AWS IoT Core**: registry, Thing, device shadow (concepts) <br> - Find IoT endpoint for region `ap-southeast-1` in console | 23/06/2026 | 23/06/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html> |
| 3 | - Learn **IoT policy**: `iot:Connect`, `iot:Publish`, `iot:Subscribe`, `iot:Receive` <br> - Draft policy for topic `smarthome/lab/*` | 24/06/2026 | 24/06/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/iot-policies.html> |
| 4 | - Study X.509 certificates: device cert, CA root, private key <br> - Note `.pem`/`.crt` files to embed in ESP32 firmware | 25/06/2026 | 25/06/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/device-certs-your-own.html> |
| 5 | - Team meeting: agree **IoT Core** as primary broker; keep Adafruit IO as POC <br> - I list minimum policy permissions for ESP32 sensor publish and relay commands | 26/06/2026 | 26/06/2026 | SmartHome_IoT repo |

### Week 3 outcomes:

* Solid lab-level understanding of **IAM** and **IoT Core** (Thing, cert, policy, endpoint).
* Draft **IoT policy JSON** for `smarthome/lab/*` topics.
* Clear on certificates required for ESP32 TLS connection to IoT Core.
* Team aligned on production MQTT path via AWS IoT Core.
