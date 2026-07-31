---
title: "Nhật ký công việc"
date: 2026-06-08
weight: 1
chapter: false
pre: " <b> 1. </b> "
---

**Trong trang này**, tổng quan nhật ký công việc của **Lê Hoàng Phúc** trong kỳ thực tập **8 tuần**, từ **08/06/2026** đến **31/07/2026**, đề tài **SmartHome_IoT**. Em phụ trách **firmware ESP32**, tích hợp **MQTT** (Adafruit IO và **AWS IoT Core**), đọc **cảm biến** (DHT nhiệt độ/độ ẩm, LDR ánh sáng) và điều khiển **actuator** (relay quạt/đèn/cửa) trên breadboard.

Song song với onboarding và học AWS (tài khoản, IAM, VPC, EC2, IoT Core, CloudWatch), em tập trung luồng **thiết bị → cloud**: cấu hình Thing/certificate, topic `smarthome/`, publish dữ liệu cảm biến, nhận lệnh điều khiển và Pomodoro từ dashboard. Từ **tuần 6**, em bắt đầu triển khai firmware thực tế; **tuần 7–8** hoàn thiện tích hợp end-to-end, sửa MQTT reconnect và viết README hướng dẫn flash/pinout.

Dưới đây là nội dung công việc theo từng tuần:

**Tuần 1:** [Onboarding, review repo và thư mục firmware ESP32](1.1-week1/)

**Tuần 2:** [Tài khoản AWS, nghiên cứu Adafruit IO MQTT feeds](1.2-week2/)

**Tuần 3:** [IAM IoT policies và khái niệm AWS IoT Core](1.3-week3/)

**Tuần 4:** [VPC — hiểu đường đi dữ liệu device-to-cloud](1.4-week4/)

**Tuần 5:** [EC2 test MQTT, lab IoT Core Thing/certificate](1.5-week5/)

**Tuần 6:** [Cấu hình topic smarthome/, publish cảm biến, CloudWatch metrics](1.6-week6/)

**Tuần 7:** [Cập nhật firmware ESP32 — cảm biến, actuator, lệnh Pomodoro](1.7-week7/)

**Tuần 8:** [Demo E2E phần cứng, firmware README, fix MQTT reconnect](1.8-week8/)
