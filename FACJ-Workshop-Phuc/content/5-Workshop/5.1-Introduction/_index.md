---
title: "Introduction"
date: 2026-07-01
weight: 1
chapter: false
pre: " <b> 5.1. </b> "
---

# SmartHome_IoT — Introduction

## What is SmartHome_IoT?

**SmartHome_IoT** monitors and controls a smart home. In this internship, **deploy and cloud infrastructure are all on AWS**.

| Layer | Technology | Role |
| ----- | ---------- | ---- |
| Devices | ESP32 (`code/`) | Sensors & actuators |
| Messaging | **AWS IoT Core** (MQTT) | Device ↔ cloud |
| Backend | Node.js on **Amazon EC2** + **IAM Role** | Automation & APIs |
| Database | **Amazon RDS** | Persist sensors/commands/events |
| Frontend | React + Vite on **Amazon S3** | Dashboard UI |
| Auth | **Amazon Cognito** | User sign-in |
| Ops | **CloudWatch**, **AWS Budgets**, **AWS CLI** | Monitor & cost control |
| Network | **Amazon VPC** + Security Groups | Isolation |

## Core use cases

1. Read temperature / humidity / light via IoT Core  
2. Control light & fan (manual + auto rules) on EC2 backend  
3. Door security events stored in RDS  
4. Dashboard on S3 with Cognito login  
5. CloudWatch alarms + Budgets for safe lab operation  

## High-level AWS architecture

```text
ESP32  --MQTT-->  AWS IoT Core
                      |
                 EC2 backend + IAM Role
                      |
           +----------+-----------+
           |                      |
        Amazon RDS            Amazon S3 (UI)
           |
     Cognito + CloudWatch + Budgets
```

![Architecture placeholder](/images/Diagram.png)
