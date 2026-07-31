---
title: "S3 static hosting"
date: 2026-07-01
weight: 1
chapter: false
pre: " <b> 5.3.1. </b> "
---

# Host SmartHome_IoT frontend on Amazon S3

### Steps (lab)
1. Create an S3 bucket in your region (unique name).
2. Enable **Static website hosting** (index document: `index.html`).
3. Upload contents of the Vite `dist/` folder (`aws s3 sync dist/ s3://your-bucket --delete`).
4. Adjust bucket policy / Block Public Access according to lab policy (prefer CloudFront in production; for internship lab follow mentor guidance).
5. Open the S3 website endpoint and verify the dashboard loads.

### CLI example
```bash
aws s3 sync dist/ s3://smarthome-iot-frontend-lab --delete
```

### Notes
- Configure SPA fallback carefully (`index.html` for client routes) if using React Router.
- Never upload `.env` files with secrets to a public bucket.
