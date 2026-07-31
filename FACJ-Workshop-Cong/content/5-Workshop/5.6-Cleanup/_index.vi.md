---
title: "Dọn dẹp tài nguyên"
date: 2026-07-01
weight: 6
chapter: false
pre: " <b> 5.6. </b> "
---

# Dọn dẹp tài nguyên lab

Tránh phát sinh chi phí AWS sau demo:

1. Stop hoặc terminate **EC2**
2. Xóa **RDS**/snapshot lab không dùng
3. Empty/xóa bucket **S3** tạm (nếu không cần)
4. Xóa alarm / log group **CloudWatch** thừa
5. Kiểm tra **AWS Budgets** và Billing
6. Rotate key nếu lộ; gỡ Access Key lab khi đã dùng IAM Role

Giữ checklist ngắn trong worklog sau mỗi ngày demo.
