---
title: "Database & Auth"
date: 2026-07-01
weight: 5
chapter: false
pre: " <b> 5.5. </b> "
---

# Database & authentication (AWS)

### Data — Amazon RDS
Typical tables:
- `sensor_readings` — temp / humidity / light
- `device_commands` — light / fan / door / sensor commands
- `door_events` — security log
- `notifications` — user alerts
- `settings` — devices + pomodoro config

Place RDS in a **private subnet**; allow only the EC2 Security Group.

### Auth — Amazon Cognito
- User Pool for email/social sign-in to the dashboard
- App client configured for the React frontend hosted on S3

### Subpages
- [RDS data model](5.5.1-dynamodb-setup/)
- [Cognito setup](5.5.2-cognito-setup/)
