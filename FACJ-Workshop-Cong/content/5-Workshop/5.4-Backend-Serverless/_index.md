---
title: "Backend on EC2"
date: 2026-07-01
weight: 4
chapter: false
pre: " <b> 5.4. </b> "
---

# SmartHome_IoT backend on Amazon EC2

The central controller is `backend/server.js`: MQTT connect, sensor persistence, automation (fan/light/door), and command forwarding.

### Related pages
- [Run backend on EC2](5.4.1-lambda-functions-setup/)
- [MQTT & command integration](5.4.2-apigw-rest-integration/)
- [Alerts & monitoring](5.4.3-ses-email-service-setup/)

### Why EC2 for this project?
Internship focus includes EC2 + IAM Roles. Running the long-lived MQTT client and automation loop on EC2 matches the SmartHome_IoT control-plane design better than short-lived Lambda handlers.
