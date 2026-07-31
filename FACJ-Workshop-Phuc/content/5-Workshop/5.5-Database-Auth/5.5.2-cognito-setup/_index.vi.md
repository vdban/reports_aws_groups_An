---
title: "Thiết lập Auth"
date: 2026-07-01
weight: 2
chapter: false
pre: " <b> 5.5.2. </b> "
---

# Amazon Cognito cho SmartHome_IoT

### Các bước (lab)
1. Tạo **Cognito User Pool** (đăng ký email hoặc IdP liên kết nếu cần).
2. Tạo **App client** cho dashboard React.
3. Cấu hình callback URL tới domain S3 website / CloudFront.
4. Kết nối frontend (Amplify/Auth SDK hoặc tương đương) với User Pool.
5. Không commit secret Cognito cần giữ riêng.

Cognito là path xác thực AWS dùng khi deploy kỳ thực tập (hạ tầng trên AWS).
