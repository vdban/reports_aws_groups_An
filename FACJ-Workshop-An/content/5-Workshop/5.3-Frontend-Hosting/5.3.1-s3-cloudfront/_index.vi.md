---
title: "Host tĩnh trên S3"
date: 2026-07-01
weight: 1
chapter: false
pre: " <b> 5.3.1. </b> "
---

# Host frontend SmartHome_IoT trên Amazon S3

### Các bước (lab)
1. Tạo bucket S3 theo region (tên duy nhất).
2. Bật **Static website hosting** (index: `index.html`).
3. Upload nội dung thư mục Vite `dist/` (`aws s3 sync dist/ s3://your-bucket --delete`).
4. Chỉnh bucket policy / Block Public Access theo hướng dẫn lab (production nên dùng CloudFront; lab theo mentor).
5. Mở endpoint website S3 và kiểm tra dashboard.

### Ví dụ CLI
```bash
aws s3 sync dist/ s3://smarthome-iot-frontend-lab --delete
```

### Lưu ý
- Với React Router, cấu hình fallback `index.html` cho SPA.
- Không upload file `.env` chứa secret lên bucket public.
