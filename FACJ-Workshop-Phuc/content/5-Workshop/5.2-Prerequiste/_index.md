---
title: "Prerequisites"
date: 2026-07-01
weight: 2
chapter: false
pre: " <b> 5.2. </b> "
---

# Prerequisites

Before building/deploying SmartHome_IoT **on AWS**:

### Accounts & tools
- AWS account with **MFA** on Root and an admin **IAM user**
- **AWS Budgets** alert configured
- **AWS CLI** installed and configured
- Node.js 18+ and npm
- Git + SmartHome_IoT repository
- ESP32 toolchain + **AWS IoT Core** device certificates for live devices

### AWS checklist
- [ ] IAM + EC2 instance profile (role)
- [ ] VPC + Security Groups
- [ ] EC2 launch / SSH / stop
- [ ] S3 bucket for frontend
- [ ] RDS in private subnet
- [ ] IoT Core Thing / policy / cert
- [ ] Cognito User Pool
- [ ] CloudWatch alarms
- [ ] Budgets

### Secrets (never commit)
- RDS password, IoT private keys, Cognito secrets that must stay private
- Use `.env` + `.gitignore`; prefer **IAM Role on EC2**
