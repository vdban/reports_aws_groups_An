---
title: "Workshop"
date: 2026-07-01
weight: 5
chapter: false
pre: " <b> 5. </b> "
---

# Xây dựng & Triển khai SmartHome_IoT trên AWS

#### Tổng quan

Workshop hướng dẫn hiểu, build và **deploy SmartHome_IoT hoàn toàn trên hạ tầng AWS**: VPC, EC2 (+ IAM Role), AWS IoT Core, RDS, S3, Cognito, CloudWatch, Budgets và AWS CLI.

SmartHome_IoT giám sát nhiệt độ, độ ẩm, ánh sáng; điều khiển đèn/quạt/cửa; hỗ trợ sự kiện an ninh và luồng Pomodoro. Thiết bị dùng **AWS IoT Core (MQTT)**; backend Node.js chạy trên **EC2**; dữ liệu trên **RDS**; UI React host trên **S3**.

Sau workshop, bạn chạy được project và deploy/vận hành trên AWS với kiểm soát chi phí và bảo mật.

#### Nội dung

1. [Giới thiệu dự án](5.1-Introduction/)
2. [Chuẩn bị môi trường](5.2-Prerequiste/)
3. [Host Frontend (S3)](5.3-Frontend-Hosting/)
4. [Backend trên EC2](5.4-Backend-Serverless/)
5. [Cơ sở dữ liệu & Auth (RDS + Cognito)](5.5-Database-Auth/)
6. [Dọn dẹp tài nguyên](5.6-Cleanup/)
7. [Demo](5.7-demo-project/)

> Link GitHub / video demo / danh sách dịch vụ AWS đầy đủ: xem [Tài liệu tham khảo](../8-References/).
