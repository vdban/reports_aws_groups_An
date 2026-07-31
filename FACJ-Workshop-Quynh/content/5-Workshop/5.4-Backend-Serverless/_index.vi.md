---
title: "Backend trên EC2"
date: 2026-07-01
weight: 4
chapter: false
pre: " <b> 5.4. </b> "
---

# Backend SmartHome_IoT trên Amazon EC2

Controller trung tâm là `backend/server.js`: kết nối MQTT, lưu cảm biến, tự động hóa (quạt/đèn/cửa), chuyển tiếp lệnh.

### Trang liên quan
- [Chạy backend trên EC2](5.4.1-lambda-functions-setup/)
- [Tích hợp MQTT & lệnh](5.4.2-apigw-rest-integration/)
- [Cảnh báo & giám sát](5.4.3-ses-email-service-setup/)

### Vì sao dùng EC2?
Kỳ thực tập tập trung EC2 + IAM Roles. MQTT client và vòng lặp automation chạy dài hạn trên EC2 phù hợp control plane SmartHome_IoT hơn Lambda ngắn hạn.
