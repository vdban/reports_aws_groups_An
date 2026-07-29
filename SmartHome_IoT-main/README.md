# Smart Home IoT — Hướng dẫn Setup & Deploy AWS

Hệ thống quản lý nhà thông minh: React dashboard + Node.js API + DynamoDB + Cognito + AWS IoT Core.  
Có thể **demo không cần ESP32** nhờ Virtual Device chạy trên EC2.

---

## Mục lục

1. [Tổng quan](#1-tổng-quan)
2. [Chạy local (dev)](#2-chạy-local-dev)
3. [Chuẩn bị AWS](#3-chuẩn-bị-aws)
4. [Deploy hạ tầng (CloudFormation)](#4-deploy-hạ-tầng-cloudformation)
5. [Deploy ứng dụng lên EC2](#5-deploy-ứng-dụng-lên-ec2)
6. [Tài khoản demo](#6-tài-khoản-demo)
7. [API & Auth](#7-api--auth)
8. [ESP32 thật (tuỳ chọn)](#8-esp32-thật-tuỳ-chọn)
9. [Reset & deploy lại](#9-reset--deploy-lại)
10. [Troubleshooting](#10-troubleshooting)
11. [Scripts tham khảo](#11-scripts-tham-khảo)
12. [Cấu trúc project](#12-cấu-trúc-project)

---

## 1. Tổng quan

### Stack AWS

| Dịch vụ | Vai trò |
|---------|---------|
| **EC2 + Nginx** | Host frontend React, proxy `/api` → backend Node.js |
| **DynamoDB** | Lưu sensor, settings, logs, lịch sử đăng nhập |
| **Cognito** | Đăng nhập production, nhóm `admin` / `user` |
| **IoT Core** | MQTT backend ↔ virtual ESP32 / ESP32 thật |
| **CloudWatch** | Audit log, app log, dashboard, alarm login fail |

### Kiến trúc

```
[Browser] ──HTTP:80──► EC2 (Nginx)
                         ├─ /        → React SPA (/opt/smarthome/dist)
                         ├─ /api/*   → Node.js :5000 (PM2)
                         └─ virtual-esp32 (PM2, MQTT)
                                    │
                          DynamoDB · Cognito · IoT Core · CloudWatch
```

### Hai chế độ chạy

| Chế độ | Auth | Database | Thiết bị |
|--------|------|----------|----------|
| **Local dev** | JWT (`admin/admin123`) | File `backend/data/local-db.json` | Simulator HTTP |
| **Production EC2** | Cognito IdToken | DynamoDB | Virtual ESP32 (MQTT) hoặc ESP32 |

### Yêu cầu chung

- **Node.js 18+** (khuyến nghị v20 LTS)
- **npm**
- **AWS CLI v2** (cho deploy production)
- **Git** (tuỳ chọn)

> **Windows:** dùng **PowerShell** + script `.ps1`. Không chạy `chmod` hay `./xxx.sh` trong PowerShell — dùng Git Bash/WSL nếu muốn script bash.

---

## 2. Chạy local (dev)

Mục tiêu: chạy dashboard trên `localhost:5173` **không cần AWS**.

### 2.1 Cấu trúc thư mục quan trọng

```
SmartHome_IoT-main/          ← npm run dev / npm run build ở ĐÂY
├── package.json             ← frontend scripts
├── backend/                 ← npm start ở ĐÂY
│   ├── package.json
│   └── .env
└── frontend/
```

### 2.2 Terminal 1 — Backend

```powershell
cd SmartHome_IoT-main\backend
copy .env.example .env
npm install
npm start
```

Kết quả mong đợi:

```
Auth: Local JWT
DB:  Local file (dev)
API: http://localhost:5000
```

File `.env` local mặc định:

```env
USE_LOCAL_DB=true
PORT=5000
JWT_SECRET=smarthome-dev-secret
ALLOW_DEV_SIMULATOR=true
ALLOW_PUBLIC_REGISTER=true
SIMULATE_DOOR=true
```

**Lỗi `bcrypt MODULE_NOT_FOUND` (Node.js v22+):**

```powershell
npm uninstall bcrypt
npm install bcryptjs
npm start
```

### 2.3 Tạo tài khoản demo local

```powershell
cd SmartHome_IoT-main\backend
node scripts/seed-local-demo.js
```

| Username | Password | Role |
|----------|----------|------|
| `admin` | `admin123` | Admin |
| `user1` | `user1123` | User |
| `user2` | `user2123` | User |

### 2.4 Terminal 2 — Virtual ESP32 (tuỳ chọn)

```powershell
cd SmartHome_IoT-main\backend
npm run simulator
```

Gửi dữ liệu giả lập qua `POST /api/dev/telemetry` — dashboard cập nhật sensor real-time.

### 2.5 Terminal 3 — Frontend

```powershell
cd SmartHome_IoT-main          # thư mục GỐC, KHÔNG phải backend/
npm install
npm run dev
```

Mở **http://localhost:5173** → đăng nhập `admin` / `admin123`.

> Vite proxy `/api` → `http://localhost:5000`. **Phải mở qua `npm run dev`**, không mở file HTML trực tiếp.

### 2.6 Kiểm tra nhanh

```powershell
Invoke-RestMethod http://localhost:5000/api/health
# {"status":"ok","db":"local","auth":"local-jwt",...}

Invoke-RestMethod -Method POST http://localhost:5000/api/login `
  -ContentType "application/json" `
  -Body '{"username":"admin","password":"admin123"}'
```

---

## 3. Chuẩn bị AWS

Làm **một lần** trước khi deploy production.

### 3.1 Cấu hình AWS CLI

```powershell
aws configure
```

| Prompt | Giá trị |
|--------|---------|
| Access Key ID | IAM User |
| Secret Access Key | IAM User |
| Region | **ap-southeast-2** |
| Output | json |

Kiểm tra:

```powershell
aws sts get-caller-identity
```

IAM User cần quyền: CloudFormation, EC2, Cognito, DynamoDB, IoT, CloudWatch Logs.

### 3.2 EC2 Key Pair

**Cách 1 — AWS Console:** EC2 → Key Pairs → Create → tải `smarthome-key.pem`

**Cách 2 — AWS CLI:**

```powershell
aws ec2 create-key-pair --key-name smarthome-key --region ap-southeast-2 `
  --query KeyMaterial --output text | Set-Content -Path smarthome-key.pem -NoNewline
```

Lưu file `.pem` tại `infrastructure/keys/smarthome-key.pem` — **không commit Git**.

**Sửa quyền file key trên Windows (bắt buộc để SSH):**

```powershell
icacls infrastructure\keys\smarthome-key.pem /inheritance:r
icacls infrastructure\keys\smarthome-key.pem /grant:r "$env:USERNAME:(R)"
```

### 3.3 Default VPC

Script deploy cần **default VPC**. Nếu account chưa có:

```powershell
aws ec2 create-default-vpc --region ap-southeast-2
```

### 3.4 AWS IoT Core — 2 certificate

#### Bước 1: Tạo Policy

IoT Core → Security → Policies → Create  
Tên: `SmartHomeDevicePolicy` — nội dung: `infrastructure/iot/iot-policy.json`

#### Bước 2: Tạo 2 Thing + Certificate

| Thing Name | Client ID | Thư mục cert |
|------------|-----------|--------------|
| `YoloHomeBackend` | `YoloHomeBackend` | `backend/certs/` |
| `YoloUNODevice` | `YoloUNODevice` | `backend/certs-device/` |

Mỗi Thing: Create thing → Auto-generate cert → Attach policy → Activate.

Đổi tên 3 file tải về thành:

```
private.pem.key
device.pem.crt
root-CA.crt
```

> Trích cert device từ firmware: `cd backend && npm run extract-certs`

#### Bước 3: Lấy IoT Endpoint

```powershell
aws iot describe-endpoint --endpoint-type iot:Data-ATS --region ap-southeast-2 `
  --query endpointAddress --output text
```

Ghi lại endpoint (vd: `xxxxx-ats.iot.ap-southeast-2.amazonaws.com`) — dùng trong `.env` production.

---

## 4. Deploy hạ tầng (CloudFormation)

Tạo: EC2 t3.micro, DynamoDB, Cognito User Pool, CloudWatch, Security Group.

### 4.1 Deploy stack

**PowerShell (Windows):**

```powershell
cd SmartHome_IoT-main
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

.\infrastructure\scripts\deploy-stack.ps1 `
  -KeyPairName smarthome-key `
  -AdminPassword "Admin@Demo2024"
```

**Git Bash / WSL:**

```bash
./infrastructure/scripts/deploy-stack.sh smarthome-stack smarthome-key Admin@Demo2024
```

### 4.2 Ghi lại Outputs

```powershell
aws cloudformation describe-stacks --stack-name smarthome-stack `
  --region ap-southeast-2 --query "Stacks[0].Outputs" --output table
```

Cần ghi:

| Output | Dùng cho |
|--------|----------|
| `EC2PublicIP` / `WebURL` | URL truy cập, `CORS_ORIGIN`, `VITE_API_URL` |
| `CognitoUserPoolId` | `COGNITO_USER_POOL_ID` |
| `CognitoClientId` | `COGNITO_CLIENT_ID` |

### 4.3 Stack lỗi `ROLLBACK_COMPLETE`

```powershell
aws cloudformation delete-stack --stack-name smarthome-stack --region ap-southeast-2
aws cloudformation wait stack-delete-complete --stack-name smarthome-stack --region ap-southeast-2
# Chạy lại deploy-stack.ps1
```

Nguyên nhân thường gặp: Key pair chưa tồn tại, thiếu default VPC, thiếu quyền IAM.

---

## 5. Deploy ứng dụng lên EC2

### 5.1 Luồng deploy (khuyến nghị)

```
① Sửa infrastructure/ec2.env.template
② Chạy deploy-all.ps1
③ Mở http://EC2_IP trên trình duyệt
```

### 5.2 Chuẩn bị file `.env` production

Sửa `infrastructure/ec2.env.template` — thay placeholder bằng giá trị thật từ CloudFormation Outputs và IoT endpoint:

```env
COGNITO_USER_POOL_ID=ap-southeast-2_XXXXXXX
COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
CORS_ORIGIN=http://EC2_PUBLIC_IP
IOT_ENDPOINT=xxxxx-ats.iot.ap-southeast-2.amazonaws.com
```

Script `deploy-all.ps1` tự upload file này lên EC2 thành `/opt/smarthome/backend/.env`  
(không upload `.env` local dev).

### 5.3 Deploy toàn bộ — một lệnh

```powershell
cd SmartHome_IoT-main

.\infrastructure\scripts\deploy-all.ps1 `
  -Ec2Host "EC2_PUBLIC_IP" `
  -KeyPath ".\infrastructure\keys\smarthome-key.pem"
```

Script tự động:

1. SSH kiểm tra kết nối EC2
2. Upload `backend/` (bỏ qua `node_modules`, `data`, `.env` local)
3. Upload `infrastructure/`
4. Upload `ec2.env.template` → `.env` production
5. Chạy `ec2-setup.sh`: `npm install`, cấu hình Nginx, start PM2
6. `npm run build` frontend với `VITE_API_URL=http://EC2_IP`
7. Upload `dist/` lên `/opt/smarthome/dist/`
8. Reload Nginx

**Chỉ deploy lại frontend (sửa UI):**

```powershell
.\infrastructure\scripts\deploy-all.ps1 -Ec2Host "EC2_IP" -KeyPath ".\infrastructure\keys\smarthome-key.pem" -SkipBackend
```

**Chỉ deploy lại backend (sửa API):**

```powershell
.\infrastructure\scripts\deploy-all.ps1 -Ec2Host "EC2_IP" -KeyPath ".\infrastructure\keys\smarthome-key.pem" -SkipFrontend
```

### 5.4 Kiểm tra sau deploy

```powershell
# Từ máy local
Invoke-RestMethod http://EC2_PUBLIC_IP/api/health

# SSH vào EC2
ssh -i infrastructure\keys\smarthome-key.pem ec2-user@EC2_PUBLIC_IP
pm2 status
pm2 logs smarthome-backend --lines 30
curl http://localhost/api/health
```

Kết quả mong đợi:

```json
{"status":"ok","db":"dynamodb","auth":"cognito","mqtt":true,"devSimulator":false}
```

> `mqtt: false` → kiểm tra cert IoT trong `backend/certs/` và policy attach đúng Thing.

### 5.5 Truy cập web

```
http://EC2_PUBLIC_IP
```

Đăng nhập tài khoản Cognito (xem [mục 6](#6-tài-khoản-demo)).

---

## 6. Tài khoản demo

### Local (JWT)

| Username | Password | Role |
|----------|----------|------|
| `admin` | `admin123` | Admin |
| `user1` | `user1123` | User |
| `user2` | `user2123` | User |

Tạo lại: `node backend/scripts/seed-local-demo.js`

### Production (Cognito)

| Username | Password | Role |
|----------|----------|------|
| `admin` | `Admin@Demo2024` | Admin |
| `user1` | `User1@Demo2024` | User |
| `user2` | `User2@Demo2024` | User |

Tạo trên Cognito:

```powershell
# PowerShell
.\infrastructure\scripts\init-cognito-admin.ps1 `
  -UserPoolId "ap-southeast-2_XXXXX" -AdminPassword "Admin@Demo2024"

# Git Bash
bash infrastructure/scripts/seed-cognito-demo.sh ap-southeast-2_XXXXX
```

Mật khẩu Cognito phải có: chữ hoa, chữ thường, số, ký tự đặc biệt.

---

## 7. API & Auth

### Auth flow

| Môi trường | Login | Token |
|------------|-------|-------|
| Local | `POST /api/login` → JWT 7 ngày | Header `Authorization: Bearer <token>` |
| Production | `POST /api/login` → Cognito IdToken | Header `Authorization: Bearer <idToken>` |

Frontend gọi `GET /api/auth/me` khi mở app để validate session.  
Logout: `POST /api/logout` (ghi logout time vào login history).

### Endpoints chính

| Method | Path | Auth | Mô tả |
|--------|------|------|-------|
| GET | `/api/health` | Không | Health check |
| GET | `/api/auth/config` | Không | Cognito enabled + pool/client id |
| POST | `/api/login` | Không | Đăng nhập |
| GET | `/api/auth/me` | Bearer | Lấy user hiện tại |
| POST | `/api/logout` | Bearer | Đăng xuất |
| POST | `/api/register` | Không | Đăng ký (khi `ALLOW_PUBLIC_REGISTER=true`) |
| GET | `/api/home` | Bearer | Dashboard data |
| POST | `/api/home/devices/:id/toggle` | Bearer | Bật/tắt thiết bị |
| GET | `/api/users` | Admin | Danh sách user |
| GET | `/api/events` | Optional | SSE real-time |
| POST | `/api/dev/telemetry` | Không | Simulator local only |

---

## 8. ESP32 thật (tuỳ chọn)

1. Trên EC2: `pm2 stop virtual-esp32` (tránh trùng Client ID MQTT)
2. Sửa `code/secrets.h` — WiFi + cert device
3. Flash `code/IoT_Lab_ESP32/IoT_Lab_ESP32.ino` bằng Arduino IDE

Thiết bị IoT trên UI: **Đèn + Quạt** (Phòng Khách), **Cửa** (Phòng Ngủ 1) — badge **IoT**.

---

## 9. Reset & deploy lại

### 9.1 Reset local

```powershell
Remove-Item backend\data\local-db.json -ErrorAction SilentlyContinue
cd backend; npm start
node scripts/seed-local-demo.js
```

### 9.2 Reset frontend build

```powershell
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
npm run build   # từ thư mục gốc SmartHome_IoT-main
```

### 9.3 Redeploy EC2 (giữ hạ tầng)

```powershell
.\infrastructure\scripts\deploy-all.ps1 -Ec2Host "EC2_IP" -KeyPath ".\infrastructure\keys\smarthome-key.pem"
```

### 9.4 Reset Cognito password

```powershell
.\infrastructure\scripts\init-cognito-admin.ps1 `
  -UserPoolId "ap-southeast-2_XXXXX" -AdminPassword "Admin@Demo2024"
```

### 9.5 Xóa toàn bộ stack (deploy từ đầu)

> Xóa EC2, DynamoDB, Cognito, CloudWatch — **không phục hồi được**.

```powershell
aws cloudformation delete-stack --stack-name smarthome-stack --region ap-southeast-2
aws cloudformation wait stack-delete-complete --stack-name smarthome-stack --region ap-southeast-2
```

Sau đó làm lại từ [mục 4](#4-deploy-hạ-tầng-cloudformation).

### 9.6 Bảng xử lý nhanh

| Tình huống | Cách làm |
|------------|----------|
| Sửa UI | `deploy-all.ps1 -SkipBackend` |
| Sửa API | `deploy-all.ps1 -SkipFrontend` |
| Đổi EC2 IP | Sửa `ec2.env.template` + redeploy frontend |
| Login fail local | Backend chưa chạy hoặc chưa seed demo |
| Login fail production | Sai Cognito password hoặc chưa seed Cognito |
| Stack ROLLBACK | Xóa stack → deploy lại |
| `npm run build` lỗi Missing script | Chạy từ thư mục **gốc**, không phải `backend/` |

---

## 10. Troubleshooting

| Triệu chứng | Nguyên nhân | Cách fix |
|-------------|-------------|----------|
| `chmod` not recognized | Chạy bash script trong PowerShell | Dùng file `.ps1` |
| `npm run build` Missing script | Sai thư mục | `cd SmartHome_IoT-main` (gốc) |
| Login local báo sai pass | Backend chưa chạy | `npm start` trong `backend/` |
| `Failed to fetch` trên UI | Frontend không gọi được API | Chạy `npm run dev`, không mở file HTML |
| `bcrypt MODULE_NOT_FOUND` | Node v22+ chặn native compile | `npm install bcryptjs` |
| SSH `bad permissions` (.pem) | Quyền file key trên Windows | `icacls` như mục 3.2 |
| SSH `invalid format` (.pem) | File key bị hỏng xuống dòng | Tạo lại key pair |
| Stack ROLLBACK_COMPLETE | Key/VPC thiếu | Xóa stack, sửa, deploy lại |
| `502 Bad Gateway` | Backend PM2 chưa chạy | `pm2 restart smarthome-backend` |
| Trang trắng | `dist/` trống hoặc build sai URL | Redeploy frontend |
| `CORS error` | Sai `CORS_ORIGIN` | Khớp `http://EC2_IP` trong `.env` |
| `mqtt: false` | Cert IoT thiếu/sai policy | Kiểm tra `backend/certs/` |
| virtual-esp32 errored | Cert device hoặc trùng Client ID | `pm2 logs virtual-esp32` |
| Upload backend quá chậm | Upload cả `node_modules` | Dùng `deploy-all.ps1` (đã loại trừ) |

---

## 11. Scripts tham khảo

### Local dev

| Lệnh | Thư mục | Mô tả |
|------|---------|-------|
| `npm start` | `backend/` | Chạy API local |
| `npm run simulator` | `backend/` | Virtual ESP32 (HTTP) |
| `node scripts/seed-local-demo.js` | `backend/` | Tạo user demo local |
| `npm run dev` | **gốc** | Frontend dev server :5173 |
| `npm run build` | **gốc** | Build production → `dist/` |

### AWS deploy (PowerShell)

| Script | Mô tả |
|--------|-------|
| `deploy-stack.ps1` | Deploy CloudFormation + set Cognito admin password |
| `deploy-all.ps1` | Upload backend + build/upload frontend |
| `deploy-frontend.ps1` | Chỉ build + upload frontend |
| `init-cognito-admin.ps1` | Reset mật khẩu admin Cognito |

### AWS deploy (Bash)

| Script | Mô tả |
|--------|-------|
| `deploy-stack.sh` | Deploy CloudFormation |
| `deploy-frontend.sh` | Build + rsync frontend |
| `ec2-setup.sh` | Chạy **trên EC2** sau upload backend |
| `seed-cognito-demo.sh` | Tạo admin + user1 + user2 trên Cognito |

---

## 12. Cấu trúc project

```
SmartHome_IoT-main/
├── package.json                 # npm run dev / build (FRONTEND)
├── frontend/
│   ├── vite.config.ts           # proxy /api → localhost:5000
│   └── src/
│       ├── api/client.ts
│       ├── contexts/AuthContext.tsx
│       ├── components/auth/LoginFlow.tsx
│       └── pages/
├── backend/
│   ├── server.js
│   ├── simulator.js             # Virtual ESP32
│   ├── ecosystem.config.cjs     # PM2 config (EC2)
│   ├── lib/                     # db, auth, cognito, mqtt, home, ...
│   ├── routes/index.js
│   ├── certs/                   # YoloHomeBackend (gitignored)
│   ├── certs-device/            # YoloUNODevice (gitignored)
│   └── scripts/
│       ├── seed-local-demo.js
│       └── extract-device-certs.js
├── code/                        # ESP32 firmware
├── infrastructure/
│   ├── ec2.env.template         # .env production mẫu (sửa trước deploy)
│   ├── cloudformation/smarthome-stack.yaml
│   ├── nginx/smarthome.conf
│   ├── iot/iot-policy.json
│   └── scripts/
│       ├── deploy-stack.ps1     # Windows
│       ├── deploy-all.ps1       # Windows — deploy app
│       ├── deploy-frontend.ps1
│       ├── init-cognito-admin.ps1
│       ├── deploy-stack.sh      # Linux/Mac
│       ├── ec2-setup.sh
│       └── seed-cognito-demo.sh
└── dist/                        # Build output (gitignored)
```

---

## Checklist deploy hoàn chỉnh

```
□ aws configure (ap-southeast-2) + sts get-caller-identity
□ Tạo default VPC (nếu chưa có)
□ Tạo EC2 Key Pair → lưu .pem vào infrastructure/keys/
□ Tạo IoT Policy + 2 Things + cert → backend/certs/ + certs-device/
□ Lấy IoT endpoint
□ deploy-stack.ps1 → ghi EC2PublicIP, CognitoUserPoolId, CognitoClientId
□ Sửa infrastructure/ec2.env.template
□ deploy-all.ps1 -Ec2Host IP -KeyPath key.pem
□ curl http://EC2_IP/api/health → ok
□ seed-cognito-demo (user1, user2)
□ Mở http://EC2_IP → login admin / Admin@Demo2024
□ Test điều khiển đèn/quạt/cửa
□ pm2 logs virtual-esp32 → connected (MQTT)
```

---

## Chi phí demo ước tính

| Dịch vụ | ~$/tháng |
|---------|----------|
| EC2 t3.micro | $0 (free tier 12 tháng) |
| DynamoDB | $0–1 |
| Cognito | $0 (MAU free tier) |
| IoT Core | $0 (250K msg free) |
| CloudWatch | $0–1 |
| **Tổng** | **~$1–4** |
