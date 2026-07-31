---
title: "Workshop"
date: 2026-07-01
weight: 5
chapter: false
pre: " <b> 5. </b> "
---

# Build & Deploy SmartHome_IoT on AWS

#### Overview

This workshop guides you through understanding, building, and **deploying SmartHome_IoT entirely on AWS infrastructure**: VPC, EC2 (+ IAM Role), AWS IoT Core, RDS, S3, Cognito, CloudWatch, Budgets, and AWS CLI.

SmartHome_IoT monitors temperature, humidity, and light; controls lights/fans/doors; and supports security events and Pomodoro-related flows. Devices use **AWS IoT Core (MQTT)**; the Node.js backend runs on **EC2**; data lives in **RDS**; the React UI is hosted on **S3**.

After this workshop you will run the project and deploy/operate it on AWS with cost and security guardrails.

#### Contents

1. [Project Introduction](5.1-Introduction/)
2. [Prerequisites](5.2-Prerequiste/)
3. [Frontend hosting (S3)](5.3-Frontend-Hosting/)
4. [Backend on EC2](5.4-Backend-Serverless/)
5. [Database & Auth (RDS + Cognito)](5.5-Database-Auth/)
6. [Cleanup](5.6-Cleanup/)
7. [Demo](5.7-demo-project/)

> Full GitHub / demo video / AWS service list: see [References](../8-References/).
