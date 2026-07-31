---
title: "Tài liệu tham khảo"
date: 2026-07-01
weight: 8
chapter: false
pre: " <b> 8. </b> "
---

# Tài liệu tham khảo (References)

Mục này tập hợp tài liệu, mã nguồn, video demo và ghi chú hạ tầng/deploy AWS cho dự án **SmartHome_IoT**.

> **Lưu ý:** Thay các URL placeholder bằng link thật trước khi nộp bài.

---

## 1. Mã nguồn & kho lưu trữ

| Hạng mục | Link / ghi chú |
| -------- | -------------- |
| **GitHub repo (SmartHome_IoT)** | `https://github.com/<org-hoặc-user>/SmartHome_IoT` *(cập nhật)* |
| **Website báo cáo (Hugo)** | `https://<username>.github.io/FACJ-Workshop/` *(cập nhật sau khi publish)* |
| **Cấu trúc source** | `frontend/` (React+Vite), `backend/` (Node.js trên EC2), `code/` (firmware ESP32) |

---

## 2. Video demo

| Hạng mục | Link / ghi chú |
| -------- | -------------- |
| **Video demo** | `https://...` *(YouTube / Drive / Loom — cập nhật)* |
| **Nội dung video nên có** | Dashboard dữ liệu realtime, điều khiển đèn/quạt/cửa, highlight AWS Console (VPC, EC2, S3, RDS, IoT Core, CloudWatch, Budgets) |

---

## 3. Hạ tầng & deploy (toàn bộ trên AWS)

Phần cloud của SmartHome_IoT trong kỳ thực tập **deploy và chạy trên AWS**:

| Lớp | Dịch vụ AWS | Vai trò |
| --- | ----------- | ------- |
| Mạng | **Amazon VPC**, Security Groups | Tách subnet public/private |
| Compute | **Amazon EC2** + **IAM Role for EC2** | Chạy backend Node.js (`server.js`) |
| Messaging thiết bị | **AWS IoT Core** (MQTT) | ESP32 ↔ cloud (telemetry & lệnh) |
| Cơ sở dữ liệu | **Amazon RDS** | Lưu cảm biến, lệnh, sự kiện, settings |
| Host frontend | **Amazon S3** (+ CloudFront tuỳ chọn) | Host build React tĩnh |
| Xác thực | **Amazon Cognito** | Đăng nhập dashboard |
| Giám sát | **Amazon CloudWatch** | Metrics, logs, alarm |
| Kiểm soát chi phí | **AWS Budgets** | Cảnh báo ngân sách |
| Vận hành | **AWS CLI** | Provision, sync, kiểm tra |

### Ghi chú deploy (tóm tắt)
1. Dựng VPC / SG / EC2 / IAM Role / RDS / S3 / IoT Core / Cognito / CloudWatch / Budgets trên tài khoản lab.
2. Deploy backend lên EC2; cấu hình env cho RDS + endpoint/cert IoT Core.
3. Build frontend và upload lên S3 (`aws s3 sync dist/ ...`).
4. Kết nối ESP32 tới **AWS IoT Core** MQTT (device cert/policy).
5. Kiểm thử end-to-end trên AWS; bật alarm CloudWatch; giữ Budgets; tắt tài nguyên sau demo.

---

## 4. Tài liệu học & tham chiếu

- AWS Docs: [VPC](https://docs.aws.amazon.com/vpc/), [EC2](https://docs.aws.amazon.com/ec2/), [IAM Roles for EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html), [S3](https://docs.aws.amazon.com/s3/), [RDS](https://docs.aws.amazon.com/rds/), [IoT Core](https://docs.aws.amazon.com/iot/), [Cognito](https://docs.aws.amazon.com/cognito/), [CloudWatch](https://docs.aws.amazon.com/cloudwatch/), [Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html), [AWS CLI](https://docs.aws.amazon.com/cli/)
- FCJ / AWS Study Group: [https://cloudjourney.awsstudygroup.com/](https://cloudjourney.awsstudygroup.com/)
- Nhóm FB AWS Study Group: [https://www.facebook.com/groups/awsstudygroupfcj](https://www.facebook.com/groups/awsstudygroupfcj)

---

## 5. Sơ đồ / ảnh đính kèm

Đặt file trong `static/images/` và gắn link tại đây:

| Tài nguyên | Đường dẫn / ghi chú |
| ---------- | ------------------- |
| Sơ đồ kiến trúc | `/images/Diagram.png` *(thay bằng sơ đồ AWS của SmartHome_IoT)* |
| Screenshot dashboard | `/images/...` *(thêm)* |
| Screenshot AWS Console | VPC, EC2, S3, RDS, IoT Core, CloudWatch, Budgets *(thêm)* |
