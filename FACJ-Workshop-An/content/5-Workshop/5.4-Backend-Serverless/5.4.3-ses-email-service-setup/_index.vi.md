---
title: "Cảnh báo & giám sát"
date: 2026-07-01
weight: 3
chapter: false
pre: " <b> 5.4.3. </b> "
---

# Cảnh báo & CloudWatch cho SmartHome_IoT

### Cảnh báo ứng dụng
- Sự kiện mở/đóng cửa và bản ghi notification trong app
- Webhook/email tuỳ chọn từ firmware/backend

### Giám sát AWS (lab)
- **CloudWatch Metrics**: CPU EC2, status check; kết nối/storage RDS nếu dùng
- **CloudWatch Logs**: đưa log `server.js` qua agent hoặc ghi file
- **Alarm + SNS email**: báo khi CPU cao hoặc status check fail
- Giữ **AWS Budgets** để cảnh báo chi phí

Phần này thay lab SES đơn thuần bằng giám sát khớp danh mục học của kỳ thực tập.
