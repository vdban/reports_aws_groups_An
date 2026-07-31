---
title: "Alerts & monitoring"
date: 2026-07-01
weight: 3
chapter: false
pre: " <b> 5.4.3. </b> "
---

# Alerts & CloudWatch for SmartHome_IoT

### Application alerts
- Door open/close events and notification records in the app
- Optional email/webhook hooks from firmware/backend paths

### AWS monitoring (lab)
- **CloudWatch Metrics**: EC2 CPU, status checks; RDS connections/storage if used
- **CloudWatch Logs**: ship `server.js` stdout via agent or simple file logging
- **Alarms + SNS email**: notify when CPU high or instance status check fails
- Keep **AWS Budgets** active for cost alerts

This replaces a pure SES-only lab with monitoring that matches the internship learning list.
