---
title: "Run backend on EC2"
date: 2026-07-01
weight: 1
chapter: false
pre: " <b> 5.4.1. </b> "
---

# Deploy `server.js` on Amazon EC2 (AWS)

### Steps
1. Launch EC2 in the lab **VPC** with a Security Group for SSH + app ports.
2. Attach an **IAM Role for EC2** (S3, CloudWatch, IoT permissions as needed — no static keys).
3. SSH in, install Node.js, clone SmartHome_IoT, `cd backend && npm install`.
4. Configure `.env` for **RDS** endpoint and **AWS IoT Core** endpoint/certs.
5. Start: `node server.js` (use `pm2`/systemd for longer demos).

### Verify
- Backend connects to IoT Core and RDS.
- Sensor topics update DB; commands publish back to devices.
