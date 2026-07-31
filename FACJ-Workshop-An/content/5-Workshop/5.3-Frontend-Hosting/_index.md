---
title: "Frontend Hosting"
date: 2026-07-01
weight: 3
chapter: false
pre: " <b> 5.3. </b> "
---

# Frontend hosting for SmartHome_IoT

The SmartHome_IoT UI is a **React + Vite** app (dashboard, auth, device controls).

### Local run
```bash
cd SmartHome_IoT
npm install
npm run dev
```
Open `http://localhost:5173`.

### Production build
```bash
npm run build
```
Output is in `dist/` (or project build folder).

### AWS options
1. **Amazon S3** static website hosting (see next section)
2. Serve build files from the same **EC2** instance as the backend (simple lab)

### Related pages
- [S3 static hosting](5.3.1-s3-cloudfront/)
- [Security configuration](5.3.2-security-configuration/)
