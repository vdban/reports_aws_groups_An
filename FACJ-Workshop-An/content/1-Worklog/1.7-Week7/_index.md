---
title: "Week 7 - Worklog"
date: 2026-07-20
weight: 7
chapter: false
pre: " <b> 1.7. </b> "
---

### Week 7 goals:

* **Update ESP32 firmware**: read DHT (temp/humidity), LDR (light); periodic publish to IoT Core.
* Control **relay** fan, light, door via subscribe on `smarthome/command/*`.
* Handle **Pomodoro** commands (start/stop/pause) from the dashboard.
* Integration test with backend/UI; collect bug list for week 8.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Wire **DHT22** on breadboard (data GPIO, 4.7kΩ pull-up); stable temp/humidity reads <br> - Publish to `smarthome/sensor/temperature`, `humidity` every 5 seconds | 20/07/2026 | 20/07/2026 | SmartHome_IoT `firmware/` |
| 2 | - Add **LDR** + voltage divider; read light level, publish `smarthome/sensor/light` <br> - Calibrate bright/dark thresholds via Serial Monitor | 21/07/2026 | 21/07/2026 | SmartHome_IoT `firmware/` |
| 3 | - Configure **3 relay modules** for fan, light, door (separate GPIO, common GND) <br> - Subscribe `smarthome/command/fan|light|door`; toggle relay on `ON`/`OFF` payload | 22/07/2026 | 22/07/2026 | SmartHome_IoT `firmware/` |
| 4 | - Implement **Pomodoro** handler: receive `{ "action": "start", "duration": 25 }` on `smarthome/command/pomodoro` <br> - Optional LED/buzzer feedback on breadboard when timer ends | 23/07/2026 | 23/07/2026 | SmartHome_IoT `firmware/` |
| 5 | - **Internal E2E test:** dashboard toggles light → relay clicks → DHT/LDR shows on UI <br> - Team demo; log bugs (MQTT delay, relay noise, WiFi drop) for week 8 | 24/07/2026 | 24/07/2026 | SmartHome_IoT repo |

### Week 7 outcomes:

* Firmware reads **temp/humidity/light** and publishes steadily to IoT Core.
* **Fan/light/door relays** controllable from dashboard via MQTT.
* **Pomodoro** commands working on firmware.
* ESP32 → IoT Core → backend → UI path tested; bug list ready for final week.
