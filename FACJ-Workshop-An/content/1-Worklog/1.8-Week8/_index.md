---
title: "Week 8 - Worklog"
date: 2026-07-27
weight: 8
chapter: false
pre: " <b> 1.8. </b> "
---

### Week 8 goals:

* **E2E hardware demo** for mentor: realtime sensors, relay control from dashboard.
* Write **firmware README**: breadboard pinout, flash steps, WiFi/cert configuration.
* **Fix MQTT reconnect** on WiFi drop or IoT Core timeout.
* Finalize worklog and prepare workshop report.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - **Fix MQTT reconnect:** exponential backoff, call `WiFi.reconnect()` + `client.connect()` <br> - Test 30-second WiFi router power-off — ESP32 reconnects automatically | 27/07/2026 | 27/07/2026 | SmartHome_IoT `firmware/` |
| 2 | - Fix week 7 integration bugs: relay stuck ON, payload parse error on missing JSON fields <br> - Stabilize DHT publish interval (avoid blocking loop on sensor read failure) | 28/07/2026 | 28/07/2026 | SmartHome_IoT `firmware/` |
| 3 | - Write **`firmware/README.md`**: DHT/relay/LDR wiring diagram, GPIO table, Arduino IDE / PlatformIO guide, sample `secrets.h` | 29/07/2026 | 29/07/2026 | SmartHome_IoT `firmware/README.md` |
| 4 | - **E2E demo rehearsal:** present breadboard, Serial Monitor, dashboard control of fan/light/door + Pomodoro <br> - Mentor feedback on connection stability | 30/07/2026 | 30/07/2026 | SmartHome_IoT repo |
| 5 | - Official demo for mentor and team <br> - Finalize Hugo worklog; note lessons learned (cert rotation, relay power supply, breadboard wiring) | 31/07/2026 | 31/07/2026 | FACJ-Workshop-phuc |

### Week 8 outcomes:

* **MQTT reconnect** stable after WiFi/IoT timeout.
* Complete **firmware README** with pinout, flash, and configuration steps.
* **E2E hardware demo** succeeded — sensors + actuators + Pomodoro via IoT Core.
* 8-week worklog complete; ready to submit workshop report.
