---
title: "MQTT & AWS IoT Core"
date: 2026-07-01
weight: 2
chapter: false
pre: " <b> 5.4.2. </b> "
---

# Device messaging with AWS IoT Core

SmartHome_IoT devices and backend communicate over **MQTT on AWS IoT Core** (infrastructure on AWS).

### Typical topics (example)
- `smarthome/sensors/temperature`
- `smarthome/sensors/humidity`
- `smarthome/sensors/light`
- `smarthome/commands/light`
- `smarthome/commands/fan`
- `smarthome/commands/pomodoro`

### Flow
1. ESP32 publishes sensor values → **AWS IoT Core**
2. Backend on EC2 receives messages (IoT SDK / MQTT client) → writes **RDS**
3. UI/automation creates a command → backend publishes to IoT Core
4. ESP32 executes the command

Register a Thing, attach a policy (least privilege), and use device certificates — never commit private keys.
