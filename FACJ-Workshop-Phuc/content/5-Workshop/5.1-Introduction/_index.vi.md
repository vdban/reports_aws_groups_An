---
title: "Giới thiệu"
date: 2026-07-01
weight: 1
chapter: false
pre: " <b> 5.1. </b> "
---

# SmartHome_IoT — Giới thiệu

## SmartHome_IoT là gì?

**SmartHome_IoT** giám sát và điều khiển nhà thông minh. Trong kỳ thực tập, **deploy và hạ tầng cloud đều trên AWS**.

| Lớp | Công nghệ | Vai trò |
| --- | --------- | ------- |
| Thiết bị | ESP32 (`code/`) | Cảm biến & actuator |
| Messaging | **AWS IoT Core** (MQTT) | Thiết bị ↔ cloud |
| Backend | Node.js trên **Amazon EC2** + **IAM Role** | Tự động hóa & API |
| Database | **Amazon RDS** | Lưu cảm biến/lệnh/sự kiện |
| Frontend | React + Vite trên **Amazon S3** | Dashboard |
| Auth | **Amazon Cognito** | Đăng nhập |
| Vận hành | **CloudWatch**, **AWS Budgets**, **AWS CLI** | Giám sát & chi phí |
| Mạng | **Amazon VPC** + Security Groups | Tách lớp |

## Use-case chính

1. Đọc nhiệt độ / độ ẩm / ánh sáng qua IoT Core  
2. Điều khiển đèn & quạt (thủ công + auto) trên backend EC2  
3. Sự kiện an ninh cửa lưu RDS  
4. Dashboard trên S3 + đăng nhập Cognito  
5. Alarm CloudWatch + Budgets cho lab an toàn  

## Kiến trúc AWS tổng quan

```text
ESP32  --MQTT-->  AWS IoT Core
                      |
                 Backend EC2 + IAM Role
                      |
           +----------+-----------+
           |                      |
        Amazon RDS            Amazon S3 (UI)
           |
     Cognito + CloudWatch + Budgets
```

![Sơ đồ kiến trúc](/images/Diagram.png)
