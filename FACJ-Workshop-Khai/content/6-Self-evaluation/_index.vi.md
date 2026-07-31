---
title: "Tự đánh giá"
date: 2026-07-01
weight: 6
chapter: false
pre: " <b> 6. </b> "
---

Trong **8 tuần** thực tập **First Cloud AI Journey (FCAJ)** tại AWS Việt Nam (**08/06/2026 – 31/07/2026**), em tham gia nhóm **5 người** triển khai **SmartHome_IoT** — nền tảng quản lý nhà thông minh với **ESP32 / Virtual ESP32**, **React dashboard**, **Node.js backend** trên **EC2 (Nginx + PM2)**, **DynamoDB**, **Amazon Cognito**, **AWS IoT Core (MQTT)**, **CloudFormation** và **CloudWatch**. Em đảm nhận vai trò **Backend Node.js / Cloud**: phát triển API, tích hợp MQTT, thiết kế lưu trữ DynamoDB và hỗ trợ deploy lên EC2.

Song song đó, em học và vận hành các dịch vụ AWS: tài khoản & **Budgets**, **IAM** / **IAM Role for EC2**, **VPC**, **EC2**, **AWS CLI**, **CloudWatch Logs**, cùng quy trình deploy qua script và **AWS Management Console** (theo workshop dự án).

Kỳ thực tập giúp em nắm luồng end-to-end: **Dashboard → Nginx → API → DynamoDB / Cognito**, đồng thời **IoT Core ↔ backend ↔ thiết bị**, và xử lý sự cố thực tế (CORS, cert MQTT, `pm2`, stack CloudFormation rollback).

| STT | Tiêu chí | Mô tả | Tốt | Khá | Trung bình |
| --- | -------- | ----- | --- | --- | ---------- |
| 1 | **Kiến thức và kỹ năng chuyên môn** | Node.js API, DynamoDB, IoT Core, deploy EC2 | ☐ | ✅ | ☐ |
| 2 | **Khả năng học hỏi** | Tiếp thu AWS và MQTT nhanh trong 8 tuần | ✅ | ☐ | ☐ |
| 3 | **Chủ động** | Tự đọc README, debug API/health, thử CLI | ☐ | ✅ | ☐ |
| 4 | **Tinh thần trách nhiệm** | Hoàn thành API, tích hợp và deploy đúng milestone | ☐ | ✅ | ☐ |
| 5 | **Kỷ luật** | Tuân thủ nội quy, ghi worklog, không commit secret | ☐ | ✅ | ☐ |
| 6 | **Tính cầu tiến** | Nhận feedback mentor/nhóm và chỉnh code, config | ☐ | ✅ | ☐ |
| 7 | **Giao tiếp** | Trình bày luồng backend, demo `/api/health` | ☐ | ☐ | ✅ |
| 8 | **Hợp tác nhóm** | Phối hợp frontend (API contract), firmware (topic MQTT) | ☐ | ✅ | ☐ |
| 9 | **Ứng xử chuyên nghiệp** | Tôn trọng mentor và thành viên nhóm | ✅ | ☐ | ☐ |
| 10 | **Tư duy giải quyết vấn đề** | Xử lý lỗi MQTT, CORS, 502 Nginx, Cognito login | ☐ | ✅ | ☐ |
| 11 | **Đóng góp vào dự án** | Backend + DynamoDB + MQTT bridge cho SmartHome_IoT | ☐ | ✅ | ☐ |
| 12 | **Tổng thể** | Đánh giá chung kỳ thực tập | ☐ | ✅ | ☐ |

### Đóng góp cụ thể vào SmartHome_IoT

- Phân tích và mở rộng **`backend/server.js`**: REST API (`/api/login`, `/api/home`, toggle thiết bị), SSE realtime.
- Thiết kế / triển khai lớp dữ liệu **DynamoDB** (single-table `SmartHome`: sensor, settings, logs).
- Tích hợp **AWS IoT Core** — subscribe/publish MQTT, virtual-esp32 trên EC2.
- Cấu hình **Cognito** (IdToken), `.env` production (`ec2.env.template`), kiểm tra `/api/health`.
- Tham gia deploy **CloudFormation stack**, SSH EC2, **`pm2`** (`smarthome-backend`, `virtual-esp32`), Nginx proxy `/api`.

### Cần cải thiện

* **Thuyết trình & demo:** trình bày rõ hơn luồng bật/tắt đèn–quạt–cửa trước mentor và hội đồng.
* **Giao tiếp sớm:** chốt API contract và topic MQTT với frontend / nhóm nhúng ngay tuần 3–4 để giảm sửa lại.
* **Cloud & bảo mật:** đi sâu hơn **VPC / Security Group**, **IoT policy**, và checklist **IAM least privilege**.
* **Vận hành:** tự tin hơn khi đọc **CloudWatch Logs** và xử lý sự cố production (502, `mqtt: false`).
