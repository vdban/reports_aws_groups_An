---
title: "Week 6 - Worklog"
date: 2026-07-13
weight: 6
chapter: false
pre: " <b> 1.6. </b> "
---

### Week 6 goals:

* Configure production **IoT Core topics**: `smarthome/sensor/*`, `smarthome/command/*`.
* Set up **sensor publish** (temp, humidity, light) from a lab client; align payload with backend.
* Enable **CloudWatch metrics** for IoT Core (connect, publish, rule execution).
* Start flashing ESP32 firmware connecting to IoT Core instead of Adafruit IO.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Define topic tree: `smarthome/sensor/temperature`, `humidity`, `light`; `smarthome/command/fan`, `light`, `door`, `pomodoro` | 13/07/2026 | 13/07/2026 | SmartHome_IoT MQTT schema |
| 2 | - Update **IoT policy** for publish/subscribe on `smarthome/` prefix <br> - Test publish from mosquitto on EC2 | 14/07/2026 | 14/07/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/iot-policies.html> |
| 3 | - Configure **CloudWatch** for IoT: `PublishIn.Success`, connection count metrics <br> - Create a simple alarm for abnormal device disconnect | 15/07/2026 | 15/07/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/metrics.html> |
| 4 | - **Firmware:** configure WiFi + IoT endpoint + embed cert on ESP32 <br> - Flash trial build; Serial Monitor shows successful TLS connection | 16/07/2026 | 16/07/2026 | SmartHome_IoT `firmware/` |
| 5 | - Team meeting: demo `smarthome/sensor/temperature` publish from ESP32 to IoT test client <br> - Backend confirms subscribe/rule receives payload | 17/07/2026 | 17/07/2026 | SmartHome_IoT repo |

### Week 6 outcomes:

* Production **`smarthome/`** topics and IoT policy configured.
* **CloudWatch metrics** monitoring IoT Core connect/publish.
* ESP32 **first IoT Core connection** — trial sensor publish succeeded.
* Team aligned on MQTT schema; ready to complete firmware in week 7.
