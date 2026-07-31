---
title: "Proposal"
date: 2026-07-01
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

# Smart Home IoT Platform  
## Smart home management and automation on AWS Cloud

### 1. Project overview

**Smart Home IoT Platform** is a home device management and automation system combining **distributed microcontrollers** (ESP32) and **AWS cloud infrastructure**. It centralizes control of living spaces, optimizes energy consumption, and provides a flexible architecture scalable for households or small businesses.

During the **FCAJ** internship, the team implements **SmartHome_IoT** — React dashboard, Node.js backend on EC2 (Nginx), DynamoDB, Cognito, IoT Core, and CloudFormation — for demo, acceptance, and technical reporting.

![SmartHome_IoT architecture](/images/workshop/Diagram.png)

### 2. Objectives

- Deploy an IoT network of **at least 5 sensor nodes** (temperature, light, motion) connected to a central management dashboard.
- Ensure **low response time** from user action on the dashboard to device execution.
- Deploy a **static project report website** with **Hugo**, auto-deployed on **AWS Amplify** for fast load and availability.
- Integrate **customizable automation scenarios** for energy saving.
- Complete, package the full system, and deliver **standardized technical documentation** within **8 weeks**.

### 3. Problem statement

Commercial smart home solutions face major barriers in cost and customization:

**Fragmentation & ecosystem lock-in** — Each vendor requires its own app, making centralized management difficult.

**Lack of autonomy** — Full dependence on third-party cloud; risk of disruption when ISP fails or services are discontinued.

For a **single-family home or small apartment**, the system needs dedicated, **cost-optimized** cloud infrastructure with **strong security**. Combining:

- **Amazon EC2 + Nginx** — advanced logic and dashboard hosting;
- **AWS IoT Core** — device MQTT connectivity;
- **Amazon Cognito** — family / lab member authorization;

delivers **centralized, secure** control.

### 4. Solution architecture

#### 4.1 Device & hardware layer (IoT)

- **ESP32** microcontrollers in rooms collect sensor data (temperature, humidity, motion) and control devices (lights, relays, fans).
- Nodes communicate over **Wi-Fi** via lightweight **MQTT** with encrypted payloads (TLS).
- **Virtual ESP32** on EC2 supports demo without hardware.

#### 4.2 Network & cloud layer (AWS)

| AWS service | Role |
| ----------- | ---- |
| **Amazon VPC** | Isolated virtual network for backend resources |
| **AWS IoT Core** | Central MQTT broker — telemetry in, commands out |
| **Amazon EC2 & Nginx** | Reverse proxy & web server — SmartHome dashboard, `/api` → Node.js |
| **Amazon DynamoDB** | NoSQL — real-time telemetry and device state history |
| **AWS IAM & CLI** | IAM permissions; infrastructure operations via CLI |
| **AWS CloudFormation** | IaC — deploy VPC, EC2, DynamoDB, Cognito, CloudWatch in one stack |
| **Amazon CloudWatch** | Performance monitoring, EC2/Nginx/IoT logs, anomaly alerts |

#### 4.3 Application, auth & reporting layer

| Component | Description |
| --------- | ----------- |
| **AWS Cognito** | User auth; Admin / User roles via tokens |
| **SmartHome Dashboard** | React SPA on EC2 (Nginx) — realtime monitoring, device control, SSE |
| **Report website (AWS Amplify)** | Hugo site auto-deployed from GitHub; direct link to EC2 dashboard for demo |

### 5. Timeline

**8-week** roadmap, **5-member** team (1 Lead, 2 Embedded engineers, 1 Backend/Cloud, 1 Frontend):

| Phase | Core work | Owners | Deliverables |
| ----- | --------- | ------ | ------------ |
| **Weeks 1–2** | Requirements, architecture diagram, hardware selection, GitHub/AWS setup | Lead, Backend, Embedded | CloudFormation template, architecture diagram |
| **Weeks 3–4** | ESP32 firmware; IoT Core certificates; MQTT prototype | 2 Embedded engineers | Stable ESP32 MQTT publish/subscribe |
| **Weeks 5–6** | EC2 + Nginx dashboard; Cognito auth; DynamoDB | Backend/Cloud, Frontend | End-to-end data flow; Amplify site linked to Nginx |
| **Weeks 7–8** | CloudWatch; latency testing; Edge Fallback; Amplify acceptance docs | Full team | Complete system; acceptance report on Amplify |

### 6. Budget estimate

| Item | Estimated cost | Notes |
| ---- | -------------- | ----- |
| **EC2 & Nginx app** | **$0** | t3.micro — AWS Free Tier |
| **DynamoDB** | **$0** | Free Tier — up to 25 GB storage |
| **IoT Core & Cognito** | **$0** | Free MQTT and MAU quotas |
| **VPC, CloudFormation, CloudWatch, IAM** | **$0** | No provisioning fees |
| **Report site (Amplify & GitHub)** | **$0** | Amplify Free Tier + GitHub CI/CD |
| **IoT hardware nodes** | **~900,000 VND** | ESP32, sensors, relays (main one-time cost) |

> Cloud operating cost is **near zero** during lab thanks to Free Tier; primary spend is **IoT hardware**.

### 7. Risk assessment

#### Risks

| Risk | Description |
| ---- | ----------- |
| Internet/Wi-Fi outage | ESP32 loses cloud connection; commands not received |
| Nginx / EC2 failure | Misconfiguration or overload disrupts dashboard |
| High control latency | Network congestion or slow EC2 delays device toggles |

#### Mitigation

- Periodic **heartbeat ping** between ESP32 and Wi-Fi router.
- **PM2 / Docker** packaging for consistent Nginx/backend runtime on EC2.
- Test **redirect and CORS** on staging/local before production deploy.

#### Contingency

- **Edge fallback** — ESP32 maintains basic local mode when cloud is unavailable.
- **CloudFormation** quick re-deploy of EC2/Nginx via CLI.
- Optimize **MQTT payload** size to reduce latency and message cost.

### 8. Expected outcomes

#### Deliverables

- Complete **ESP32 gateway/node hardware** tested in a small home/apartment setup.
- **SmartHome Dashboard** stable on Nginx/EC2 with **AWS Cognito** authorization.
- **Report website** on **AWS Amplify** (Hugo) with technical docs, architecture, and live dashboard link.
- **CloudFormation stack** provisioning VPC, EC2, DynamoDB, IoT Core, Cognito, CloudWatch.

#### Technical & performance

- **Low latency** for remote device on/off control.
- Secure operation within **VPC**; Nginx as security front; **24/7** CloudWatch monitoring.

#### Practical value

A **self-owned**, **low monthly cost** smart home solution with enterprise-grade security at residential scale — plus a full **end-to-end AWS learning platform** for the FCAJ internship.
