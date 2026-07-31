---
title: "Cấu hình bảo mật"
date: 2026-07-01
weight: 2
chapter: false
pre: " <b> 5.3.2. </b> "
---

# Lưu ý bảo mật frontend & asset SmartHome_IoT

- Hạn chế đưa Firebase/API key vào repo công khai; dùng biến môi trường khi build một cách cẩn thận.
- Production: ưu tiên bucket private + CloudFront; lab: chỉ public đúng object cần thiết.
- Trình duyệt chỉ gọi backend tin cậy (HTTPS).
- Cấu hình CORS cho origin frontend nếu API khác domain.
- IAM least privilege cho user CI/deploy upload S3.
