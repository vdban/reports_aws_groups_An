---
title: "5.6 Deploy ứng dụng"
date: 2026-07-01
weight: 6
chapter: false
pre: " <b>  </b> "
---

#  Deploy ứng dụng lên EC2

Sau hạ tầng CloudFormation, upload **backend + frontend build** lên EC2. Nginx phục vụ React tại `/` và proxy `/api/*` → Node.js port 5000 (PM2).

Luồng khuyến nghị từ README:

```
① Sửa infrastructure/ec2.env.template
② Chạy deploy-all.ps1
③ Mở http://EC2_IP
```

---

## Bước 1 — Chuẩn bị file `.env` production

Mở `SmartHome_IoT-main/infrastructure/ec2.env.template`, thay placeholder:

```env
COGNITO_USER_POOL_ID=ap-southeast-2_XXXXXXX    # Output CognitoUserPoolId
COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx   # Output CognitoClientId
CORS_ORIGIN=http://EC2_PUBLIC_IP               # http:// + EC2PublicIP
IOT_ENDPOINT=xxxxx-ats.iot.ap-southeast-2.amazonaws.com
```

Các biến khác giữ mặc định (`DYNAMODB_TABLE=SmartHome`, `MQTT_ENABLED=true`, ...).

![Sửa ec2.env.template trên VS Code](/images/workshop/5.6-01-ec2-env-template.png)

---

## Bước 2 — Deploy tự động (PowerShell — khuyến nghị)

```powershell
cd SmartHome_IoT-main

.\infrastructure\scripts\deploy-all.ps1 `
  -Ec2Host "EC2_PUBLIC_IP" `
  -KeyPath ".\infrastructure\keys\smarthome-key.pem"
```

Script thực hiện:

1. SSH kiểm tra EC2
2. Upload `backend/` (bỏ `node_modules`, `data`, `.env` local)
3. Upload `infrastructure/` + cert IoT trong `backend/certs/`
4. Copy `ec2.env.template` → `/opt/smarthome/backend/.env`
5. Chạy `ec2-setup.sh`: `npm install`, Nginx, PM2 (`smarthome-backend`, `virtual-esp32`)
6. `npm run build` frontend với `VITE_API_URL=http://EC2_IP`
7. Upload `dist/` → `/opt/smarthome/dist/`, reload Nginx

![Chạy deploy-all.ps1 thành công](/images/workshop/5.6-02-deploy-all-script.png)

**Chỉ deploy lại frontend:**

```powershell
.\infrastructure\scripts\deploy-all.ps1 -Ec2Host "EC2_IP" -KeyPath ".\infrastructure\keys\smarthome-key.pem" -SkipBackend
```

**Chỉ deploy lại backend:**

```powershell
.\infrastructure\scripts\deploy-all.ps1 -Ec2Host "EC2_IP" -KeyPath ".\infrastructure\keys\smarthome-key.pem" -SkipFrontend
```

---

## Bước 3 — Kiểm tra trên EC2 (Console + SSH)

### 3.1 EC2 Instance Connect / SSH

```powershell
ssh -i infrastructure\keys\smarthome-key.pem ec2-user@EC2_PUBLIC_IP
```


### 3.2 PM2 processes

```bash
pm2 status
pm2 logs smarthome-backend --lines 20
pm2 logs virtual-esp32 --lines 20
```

Kỳ vọng:

| Process | Trạng thái |
|---------|------------|
| `smarthome-backend` | online |
| `virtual-esp32` | online (MQTT connected) |


### 3.3 Nginx

```bash
sudo nginx -t
sudo systemctl status nginx
ls -la /opt/smarthome/dist/
```


**Console:** EC2 → instance → mở **Public IP** trên browser — có thể thấy trang React (hoặc 502 nếu backend chưa sẵn sàng).


---

## Bước 4 — Cấu hình Nginx (tham khảo Console / SSH)

File mẫu: `infrastructure/nginx/smarthome.conf` — script `ec2-setup.sh` copy vào `/etc/nginx/conf.d/`.

Nội dung chính:

- `location /` → `/opt/smarthome/dist` (SPA)
- `location /api/` → `http://127.0.0.1:5000`

![File nginx smarthome.conf trên EC2](/images/workshop/5.6-07-nginx-config.png)

---

## Bước 5 — Upload cert IoT (nếu deploy thủ công)

Nếu không dùng script, đảm bảo trên EC2:

```
/opt/smarthome/backend/certs/          ← YoloHomeBackend
/opt/smarthome/backend/certs-device/   ← YoloUNODevice
```


---

## Checklist bước 5.6

| # | Hạng mục | Trạng thái |
|---|----------|------------|
| 1 | `ec2.env.template` đã điền đủ | ☐ |
| 2 | `deploy-all.ps1` chạy thành công | ☐ |
| 3 | `pm2 status` — backend + virtual-esp32 online | ☐ |
| 4 | Nginx serving `/opt/smarthome/dist` | ☐ |
| 5 | Cert IoT có trên EC2 | ☐ |
