---
title: "Chuẩn bị môi trường"
date: 2026-07-01
weight: 2
chapter: false
pre: " <b> 5.2. </b> "
---

# Chuẩn bị môi trường

Trước khi build/deploy SmartHome_IoT **trên AWS**:

### Tài khoản & công cụ
- Tài khoản AWS có **MFA** Root và **IAM user** admin
- Cảnh báo **AWS Budgets**
- **AWS CLI** đã cấu hình
- Node.js 18+ và npm
- Git + repo SmartHome_IoT
- Toolchain ESP32 + certificate **AWS IoT Core** cho thiết bị thật

### Checklist AWS
- [ ] IAM + instance profile EC2 (role)
- [ ] VPC + Security Groups
- [ ] Launch / SSH / stop EC2
- [ ] Bucket S3 cho frontend
- [ ] RDS private subnet
- [ ] IoT Core Thing / policy / cert
- [ ] Cognito User Pool
- [ ] Alarm CloudWatch
- [ ] Budgets

### Bí mật (không commit)
- Mật khẩu RDS, private key IoT, secret Cognito cần giữ riêng
- Dùng `.env` + `.gitignore`; ưu tiên **IAM Role trên EC2**
