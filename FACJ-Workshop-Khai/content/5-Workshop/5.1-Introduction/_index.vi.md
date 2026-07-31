---
title: "5.1 Giới thiệu"
date: 2026-07-01
weight: 1
chapter: false
pre: " <b>  </b> "
---


## SmartHome_IoT là gì?

**SmartHome_IoT** là hệ thống quản lý nhà thông minh gồm:

- **Frontend:** React + Vite (dashboard giám sát, điều khiển thiết bị)
- **Backend:** Node.js (`backend/server.js`) — REST API, SSE real-time, MQTT bridge
- **Thiết bị:** ESP32 thật hoặc **Virtual ESP32** (chạy trên EC2 qua PM2) — demo không cần phần cứng
- **Cloud:** DynamoDB, Cognito, IoT Core, CloudWatch trên AWS

Repo tham chiếu: `SmartHome_IoT-main/` trong workspace.

![Kiến trúc tổng quan SmartHome_IoT](/images/workshop/Diagram.png)

## Hai chế độ chạy

| Chế độ | Auth | Database | Thiết bị |
|--------|------|----------|----------|
| **Local dev** | JWT (`admin/admin123`) | File `backend/data/local-db.json` | Simulator HTTP |
| **Production EC2** | Cognito IdToken | DynamoDB | Virtual ESP32 (MQTT) hoặc ESP32 |

Workshop này tập trung **Production EC2** — triển khai qua AWS Console + script deploy.

## Stack AWS (production)

| Lớp | Công nghệ | Vai trò |
|-----|-----------|---------|
| Compute | **EC2** t3.micro + **Nginx** | Host UI + API proxy |
| Database | **DynamoDB** (`SmartHome`) | Single-table: sensor, settings, logs |
| Auth | **Cognito User Pool** | Nhóm `admin` / `user` |
| Messaging | **IoT Core** (MQTT) | Backend ↔ thiết bị |
| Monitoring | **CloudWatch** Logs + Dashboard + Alarm | Audit, app log, login fail |

## Luồng deploy tổng quan

```
① Chuẩn bị AWS (region, key pair, VPC)
② Cấu hình IoT Core (Policy + 2 Things + cert)
③ Deploy CloudFormation → EC2, DynamoDB, Cognito, CloudWatch
④ Ghi Outputs (EC2 IP, Cognito Pool/Client ID, IoT endpoint)
⑤ Sửa ec2.env.template → deploy code lên EC2
⑥ Tạo user Cognito demo
⑦ Kiểm tra http://EC2_IP và điều khiển thiết bị
```


## Yêu cầu trước khi bắt đầu

- Tài khoản AWS (Free Tier đủ cho demo)
- **Node.js 18+** trên máy local (build frontend)
- **AWS CLI v2** (tuỳ chọn — script deploy dùng CLI)
- Mã nguồn `SmartHome_IoT-main/` đã clone về máy

