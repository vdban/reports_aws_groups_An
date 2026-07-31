---
title: "References"
date: 2026-07-01
weight: 8
chapter: false
pre: " <b> 8. </b> "
---

# References

This section collects documents, source code, demo media, and AWS infrastructure notes for **SmartHome_IoT**.

> **Note:** Replace placeholder URLs with your real links before submission.

---

## 1. Source code & repositories

| Item | Link / note |
| ---- | ----------- |
| **GitHub repo (SmartHome_IoT)** | `https://github.com/<your-org-or-user>/SmartHome_IoT` *(update)* |
| **Internship report site (Hugo)** | `https://<your-username>.github.io/FACJ-Workshop/` *(update after publish)* |
| **Source layout** | `frontend/` (React+Vite), `backend/` (Node.js on EC2), `code/` (ESP32 firmware) |

---

## 2. Demo video

| Item | Link / note |
| ---- | ----------- |
| **Demo video** | `https://...` *(YouTube / Drive / Loom — update)* |
| **What the video should show** | Dashboard live data, device control (light/fan/door), AWS Console highlights (VPC, EC2, S3, RDS, IoT Core, CloudWatch, Budgets) |

---

## 3. AWS infrastructure & deploy (all on AWS)

SmartHome_IoT internship deploy targets **AWS only** for cloud infrastructure:

| Layer | AWS service | Role |
| ----- | ----------- | ---- |
| Networking | **Amazon VPC**, Security Groups | Isolate public/private subnets |
| Compute | **Amazon EC2** + **IAM Role for EC2** | Run Node.js backend (`server.js`) |
| Device messaging | **AWS IoT Core** (MQTT) | ESP32 ↔ cloud telemetry & commands |
| Database | **Amazon RDS** | Persist sensors, commands, events, settings |
| Frontend hosting | **Amazon S3** (+ optional CloudFront) | Static React build |
| Auth (AWS path) | **Amazon Cognito** | User sign-in for dashboard |
| Monitoring | **Amazon CloudWatch** | Metrics, logs, alarms |
| Cost control | **AWS Budgets** | Spending alerts |
| Operations | **AWS CLI** | Provision, sync, verify |

### Deploy notes (summary)
1. Provision VPC / SG / EC2 / IAM Role / RDS / S3 / IoT Core / Cognito / CloudWatch / Budgets in the lab account.
2. Deploy backend to EC2; configure env for RDS + IoT Core endpoint/certs.
3. Build frontend and upload to S3 (`aws s3 sync dist/ ...`).
4. Connect ESP32 to **AWS IoT Core** MQTT (device certs/policies).
5. Verify end-to-end on AWS; enable CloudWatch alarms; keep Budgets on; stop idle resources after demo.

---

## 4. Documentation & learning references

- AWS Documentation: [VPC](https://docs.aws.amazon.com/vpc/), [EC2](https://docs.aws.amazon.com/ec2/), [IAM Roles for EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html), [S3](https://docs.aws.amazon.com/s3/), [RDS](https://docs.aws.amazon.com/rds/), [IoT Core](https://docs.aws.amazon.com/iot/), [Cognito](https://docs.aws.amazon.com/cognito/), [CloudWatch](https://docs.aws.amazon.com/cloudwatch/), [Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html), [AWS CLI](https://docs.aws.amazon.com/cli/)
- FCJ / AWS Study Group: [https://cloudjourney.awsstudygroup.com/](https://cloudjourney.awsstudygroup.com/)
- AWS Study Group Facebook: [https://www.facebook.com/groups/awsstudygroupfcj](https://www.facebook.com/groups/awsstudygroupfcj)

---

## 5. Architecture / screenshots (attachments)

Place files under `static/images/` and link here:

| Asset | Path / note |
| ----- | ----------- |
| Architecture diagram | `/images/Diagram.png` *(replace with AWS architecture of SmartHome_IoT)* |
| Dashboard screenshot | `/images/...` *(add)* |
| AWS Console screenshots | VPC, EC2, S3, RDS, IoT Core, CloudWatch, Budgets *(add)* |
