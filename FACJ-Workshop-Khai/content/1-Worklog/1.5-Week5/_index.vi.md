---
title: "Tuần 5 - Nhật ký công việc"
date: 2026-07-06
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

### Mục tiêu tuần 5:

* Khởi tạo EC2 instance cho phát triển backend.
* Cài **Node.js** (LTS) và `npm install` dependencies.
* Chạy `server.js` trên EC2 — bind port 3000.
* Gắn **IAM Role** cho EC2 truy cập DynamoDB và IoT (không hardcode key).

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Launch EC2 (Amazon Linux 2023); gắn `sg-smarthome-api` <br> - SSH vào; update packages | 06/07/2026 | 06/07/2026 | <https://docs.aws.amazon.com/ec2/> |
| 2 | - Cài Node.js LTS qua `nvm` hoặc package manager <br> - Kiểm tra `node -v`, `npm -v` | 07/07/2026 | 07/07/2026 | <https://nodejs.org/> |
| 3 | - Clone repo; `npm install` trong `backend/` <br> - Copy `.env.example` → `.env`; đặt `PORT=3000` | 08/07/2026 | 08/07/2026 | SmartHome_IoT `backend/` |
| 4 | - Tạo IAM Role với policy DynamoDB + IoT; gắn vào EC2 <br> - Bỏ static AWS key khỏi `.env` trên instance | 09/07/2026 | 09/07/2026 | <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html> |
| 5 | - Chạy `node server.js`; test `GET /health`, `GET /api/sensors` local và qua public IP <br> - Sửa CORS header cho frontend origin | 10/07/2026 | 10/07/2026 | Postman, `curl` |

### Thành quả tuần 5:

* EC2 chạy Node.js; backend khởi động không lỗi.
* IAM Role cung cấp credential AWS — không có key trong source.
* API phản hồi port 3000 từ client bên ngoài.
* Em đã thiết lập workflow dev trên EC2 cho schema tuần 6.
