---
title: "Data model / RDS"
date: 2026-07-01
weight: 1
chapter: false
pre: " <b> 5.5.1. </b> "
---

# SmartHome_IoT data on Amazon RDS

### Example tables
| Table | Purpose |
| ----- | ------- |
| `sensor_readings` | Temp, humidity, light |
| `device_commands` | Light / fan / door / sensor commands |
| `door_events` | Security activity log |
| `notifications` | User-facing alerts |
| `settings` | Devices + pomodoro config |

### Lab tips
- Private subnet + SG only from EC2
- Connection string in `.env` on EC2 (IAM Role for other AWS APIs)
- Optional automated backups / snapshots for demos
