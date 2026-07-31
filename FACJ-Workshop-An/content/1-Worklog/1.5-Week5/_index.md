---
title: "Week 5 - Worklog"
date: 2026-07-06
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

### Week 5 goals:

* Launch **EC2** in the lab VPC; install an MQTT client (mosquitto) for **publish/subscribe tests**.
* Create an **IoT Core Thing**, certificate, and attach an IoT policy.
* Connect over TLS from EC2 to the IoT endpoint; verify messages in the MQTT test client.
* Prepare cert/key bundle to embed in ESP32 firmware next week.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Launch EC2 t2/t3.micro in public subnet; SSH into instance <br> - Install `mosquitto-clients` for MQTT testing | 06/07/2026 | 06/07/2026 | <https://docs.aws.amazon.com/ec2/> |
| 2 | - Create **IoT Thing** `smarthome-esp32-lab` in IoT Core console <br> - Generate certificate + private key; download and store securely | 07/07/2026 | 07/07/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/create-device-cert.html> |
| 3 | - Attach **IoT policy** (publish/subscribe `smarthome/lab/*`) to certificate <br> - Test `mosquitto_pub`/`mosquitto_sub` from EC2 with cert on port 8883 | 08/07/2026 | 08/07/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/connect-to-iot.html> |
| 4 | - Use IoT console **MQTT test client** to subscribe to lab topic <br> - Publish sample JSON `{ "temp": 28.5, "humidity": 65 }` | 09/07/2026 | 09/07/2026 | AWS IoT Core console |
| 5 | - Team meeting: demo EC2 MQTT test; share cert structure for firmware <br> - I prepare `certs/` folder in firmware repo (no private key in git) | 10/07/2026 | 10/07/2026 | SmartHome_IoT `firmware/` |

### Week 5 outcomes:

* **EC2 MQTT test** succeeded — publish/subscribe via IoT Core over TLS.
* Lab **Thing + certificate + IoT policy** created and verified.
* Sample JSON payload and test workflow ready before flashing ESP32 firmware.
* Ready to configure production `smarthome/` topics and CloudWatch in week 6.
