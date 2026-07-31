---
title: "Demo"
date: 2026-07-01
weight: 7
chapter: false
pre: " <b> 5.7. </b> "
---

# SmartHome_IoT demo checklist (AWS)

### Show
1. Dashboard on **S3** with **Cognito** login
2. Live readings via **IoT Core** → EC2 backend → **RDS**
3. Toggle light/fan; show IoT Core / backend logs
4. Architecture: ESP32 → IoT Core → EC2 → RDS / S3
5. AWS Console: VPC, EC2+Role, S3, RDS, IoT Core, Cognito, CloudWatch, Budgets

### Links
See [References](../../8-References/) for GitHub, demo video, and AWS infra notes.

### Sample commands
```bash
# Frontend build → S3
npm run build
aws s3 sync dist/ s3://your-smarthome-ui --delete

# Backend on EC2
cd backend && node server.js
```
