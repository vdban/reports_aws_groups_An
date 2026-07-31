---
title: "Proposal"
date: 2026-07-01
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

# SmartHome_IoT  
## Unified AWS Solution for Real-Time Smart Home Monitoring & Control

### 1. Executive Summary

**SmartHome_IoT** is designed for the **intern team at FCAJ**, Ho Chi Minh City, to build a smart home monitoring and control platform for learning, demos, and IoT research on AWS. The system supports **1–3 ESP32 devices** (expandable with additional sensors/actuators), collecting temperature, humidity, and light; controlling lights, fans, and doors; security alerts; and Pomodoro workflows. Device data is transmitted via **MQTT** (Adafruit IO / **AWS IoT Core**). The platform leverages **Amazon VPC**, **EC2**, **RDS**, **S3**, **Lambda**, **API Gateway**, **Cognito**, **CloudWatch**, and **AWS Budgets** to deliver real-time monitoring, centralized management, and lab cost control, with secure access for team members through **Amazon Cognito**.

### 2. Problem Statement

#### Current Problem

Existing smart home demos often rely on Firebase or local servers, with credentials scattered in source code, no unified cloud infrastructure, and no cost monitoring. When integrating multiple modules (ESP32, backend, dashboard), sensor data, control commands, and security events become fragmented — hard to scale, maintain, and unsuitable as an AWS learning platform for interns.

#### Solution

The **SmartHome_IoT** platform moves to a consistent AWS stack: **ESP32** devices send data via **MQTT** to **AWS IoT Core**; a Node.js backend runs on **Amazon EC2** with an **IAM Role for EC2** (no hard-coded access keys); sensor data, commands, and events are stored on **Amazon RDS** (or **DynamoDB** for a NoSQL single-table model); the **React/Vite** UI is hosted on **Amazon S3**; authentication via **Amazon Cognito**; **Lambda** and **API Gateway** support optional serverless APIs; **CloudWatch** and **AWS Budgets** monitor operations and cost. Similar to platforms like ThingsBoard and CoreIoT, users can view a real-time dashboard and send control commands — but this solution is optimized for small lab scale, low cost, and internal learning. Key features: monitoring dashboard, device control (manual/auto), door event logs, Pomodoro, and AWS cost alerts.

#### Benefits & Return on Investment (ROI)

The solution provides an end-to-end AWS practice platform for interns (VPC → EC2 → RDS/S3 → Cognito → CloudWatch) and a codebase that can extend to future lab IoT projects. A centralized system replaces local servers and manual credential management, simplifying module integration (firmware, backend, frontend) and improving data reliability. Estimated lab infrastructure cost: **~$1.20/month** (Free Tier + stopping EC2/RDS when idle), **~$14.40 total for 12 months**. ESP32 hardware and sensors are already available or low one-time cost (~$30–50 per kit). Payback period: **6–12 months** through saved setup, debugging, and manual operations time vs. the previous fragmented approach.

### 3. Solution Architecture

The platform uses a **hybrid AWS architecture** (EC2 + managed services + optional serverless) to manage data from 1–3 ESP32 devices, expandable with additional IoT nodes. Device data is ingested via **AWS IoT Core** (MQTT); a **Node.js** backend on **EC2** handles automation logic, command forwarding, and DB writes to **RDS**/**DynamoDB**; **S3** hosts the React dashboard; **Cognito** protects access; **Lambda** + **API Gateway** for serverless APIs when needed; **CloudWatch** + **Budgets** for operations monitoring.

![SmartHome_IoT Architecture](/images/Diagram.png)

#### AWS Services Used

| Service | Role |
| ------- | ---- |
| **Amazon VPC** | Lab network: public subnet (EC2), private subnet (RDS) |
| **Amazon EC2** + **IAM Role** | Run Node.js backend (`server.js`), automation rules |
| **AWS IoT Core** | MQTT ingest/publish for ESP32 (sensors, actuators, Pomodoro) |
| **Amazon RDS** | Store sensor data, control commands, security events |
| **Amazon DynamoDB** | (Optional) Single-table design — NoSQL learning, backend migration |
| **Amazon S3** | Host React/Vite frontend (static website) |
| **AWS Lambda** | Supplementary serverless API/event processing |
| **Amazon API Gateway** | REST API for frontend and external integration |
| **Amazon Cognito** | User Pool — dashboard sign-in, limited lab users |
| **Amazon CloudWatch** | Metrics, logs, alarms (EC2, RDS, IoT) |
| **AWS Budgets** | Lab cost alerts |
| **AWS CLI** | Provision, deploy, and operate from terminal |

#### Component Design

| Component | Description |
| --------- | ----------- |
| **Edge device** | ESP32 (`code/`) — DHT/light sensors, light/fan relays, door sensor; MQTT over Wi-Fi |
| **Data ingestion** | AWS IoT Core receives sensor topics; Adafruit IO MQTT as bridge during migration |
| **Backend (control plane)** | EC2 runs Node.js — MQTT subscribe, auto rules (fan/light), command forward, DB writes |
| **Data storage** | RDS (relational) or DynamoDB (NoSQL single-table: SENSOR, SETTINGS, CMD#, EVENT#) |
| **Web UI** | React dashboard on S3 — realtime monitoring, control, Pomodoro, door notifications |
| **Authentication** | Cognito User Pool — limited to lab team member accounts |
| **Monitoring & cost** | CloudWatch logs/alarms; Budgets threshold alerts |

### 4. Technical Implementation

#### Deployment Phases

The project has two parts — **ESP32 firmware/devices** and the **SmartHome_IoT cloud platform** — each going through 4 phases during the 8-week internship:

| Phase | Content | Timeline |
| ----- | ------- | -------- |
| **Research & architecture** | Analyze repo (`frontend`, `backend`, `code/`), design AWS architecture, DB schema | Weeks 1, 6 |
| **Cost & feasibility** | AWS Pricing Calculator, Free Tier, Budgets; lab feasibility check | Week 2 |
| **Architecture refinement** | Optimize VPC/EC2/RDS, IAM Role over static keys, RDS vs DynamoDB choice | Weeks 3–5 |
| **Develop, test, deploy** | Module integration, deploy EC2/S3/RDS, E2E test, demo, report | Weeks 6–8 |

#### Technical Requirements

**ESP32 Device**

- Sensors: temperature, humidity (DHT), light, door distance (ultrasonic/simulated).
- Actuators: light/fan relays; Pomodoro command support.
- Arduino/PlatformIO firmware; MQTT via Adafruit IO or AWS IoT Core.
- Estimated ~1–5 MB/day/device (depending on publish frequency).

**Cloud Platform**

- **VPC + EC2 + IAM Role**: host Node.js backend, Security Group for API/SSH ports.
- **RDS** (MySQL/PostgreSQL lab) or **DynamoDB** (single-table, pay-per-request).
- **S3**: React/Vite build, static hosting or CloudFront (optional).
- **IoT Core**: Thing, certificate, policy; topic prefix `smarthome/`.
- **Cognito**: User Pool for 3–5 team members.
- **Lambda + API Gateway**: supplementary serverless API (week 7 — learn and integrate if suitable).
- **CloudWatch + Budgets + AWS CLI**: monitoring, alerts, automated deploy.

### 5. Timeline & Milestones

| Phase | Milestone | Content |
| ----- | --------- | ------- |
| **Week 1** | Onboarding | Office/rules familiarity, pass requirements; form team; choose SmartHome_IoT; 8-week roadmap |
| **Weeks 2–5** | AWS foundations | Account, Budgets, CLI, IAM, VPC, EC2, IAM Roles |
| **Week 6** | Architecture & DB | S3, RDS, CloudWatch; finalize architecture; database schema design |
| **Week 7** | Module integration | DynamoDB, Lambda, API Gateway, Cognito; integrate backend–frontend–MQTT |
| **Week 8** | Finalize & report | Bug fixes, AWS E2E test, demo, bilingual workshop docs, resource cleanup |
| **Post-deploy** | Expansion | Add ESP32 nodes, migrate frontend to Cognito/API, extend automation rules |

### 6. Budget Estimation

> Details available on [AWS Pricing Calculator](https://calculator.aws/).  
> Lab uses Free Tier and **stops EC2/RDS when not demoing** to keep costs low.

#### Infrastructure Cost (lab, ~1 ESP32 device)

| Item | Cost/month |
| ---- | ---------- |
| Amazon EC2 (t3.micro, ~160 hrs/month) | $0.00 (Free Tier) or ~$0.50 |
| Amazon RDS (db.t3.micro, ~160 hrs/month) | $0.00 (Free Tier) or ~$0.40 |
| Amazon S3 Standard (1 GB, ~500 requests) | $0.05 |
| AWS IoT Core (1 device, ~10,000 messages) | $0.02 |
| AWS Lambda (500 requests, 256 MB) | $0.00 |
| Amazon API Gateway (1,000 requests) | $0.01 |
| Amazon Cognito (≤5 users, low MAU) | $0.00 |
| Amazon CloudWatch (logs + 1 alarm) | $0.10 |
| Data transfer | $0.02 |
| **Total** | **~$1.20/month · ~$14.40/12 months** |

#### Hardware (one-time)

| Item | Cost |
| ---- | ---- |
| ESP32 DevKit + DHT, LDR, relay sensors, wires/jumpers | ~$30–50 per kit |
| (Optional) Breadboard, 5V power supply | ~$10 |

### 7. Risk Assessment

#### Risk Matrix

| Risk | Impact | Probability |
| ---- | ------ | ----------- |
| Wi-Fi / MQTT disconnect | Medium | Medium |
| IoT cert/policy misconfiguration | High | Medium |
| ESP32 sensor failure | Medium | Low |
| Forgotten EC2/RDS → budget overrun | Medium | Medium |
| Credentials leaked in git | High | Low |

#### Mitigation Strategies

| Risk | Mitigation |
| ---- | ---------- |
| Network | ESP32 MQTT reconnect; backend error buffer/log; CloudWatch alarm |
| IoT cert/policy | Pre-deploy policy checklist; test publish/subscribe per topic |
| Sensors | Periodic checks; backend mock data when device unavailable |
| Cost | **AWS Budgets** alerts; stop EC2/RDS checklist after demos |
| Credentials | **IAM Role for EC2**; `.env` + `.gitignore`; never commit keys |

#### Contingency Plan

- Run backend locally (`npm start`) if EC2 has a temporary outage.
- Use `server.firebase.js` (backup) when AWS migration is incomplete.
- CloudFormation/Terraform template (optional) for fast lab config recovery.

### 8. Expected Outcomes

#### Technical Improvements

- **Real-time** monitoring and control dashboard replacing local server / fragmented Firebase setup.
- Unified AWS architecture: VPC, EC2 + IAM Role, IoT Core, RDS/S3, Cognito, CloudWatch.
- Firmware, backend, and frontend modules **integrated end-to-end**; expandable with more ESP32 devices and automation rules.

#### Long-Term Value

- Codebase and bilingual workshop documentation (VI/EN) reusable for future intern cohorts.
- Compact, low-cost lab IoT platform suitable for demos and further research (AI/analytics on sensor data).
- Full AWS hands-on experience — from account setup to deploy, monitoring, and cleanup — meeting FCAJ internship requirements.
