---

title: "5.6 Deploy Application"

date: 2026-07-01

weight: 6

chapter: false

pre: " <b>  </b> "

---



# Deploy application to EC2



After CloudFormation infrastructure, upload **backend + frontend build** to EC2. Nginx serves React at `/` and proxies `/api/*` → Node.js port 5000 (PM2).



Recommended flow from README:



```

① Edit infrastructure/ec2.env.template

② Run deploy-all.ps1

③ Open http://EC2_IP

```



---



## Step 1 — Prepare production `.env` file



Open `SmartHome_IoT-main/infrastructure/ec2.env.template`, replace placeholders:



```env

COGNITO_USER_POOL_ID=ap-southeast-2_XXXXXXX    # Output CognitoUserPoolId

COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx   # Output CognitoClientId

CORS_ORIGIN=http://EC2_PUBLIC_IP               # http:// + EC2PublicIP

IOT_ENDPOINT=xxxxx-ats.iot.ap-southeast-2.amazonaws.com

```



Keep other variables at defaults (`DYNAMODB_TABLE=SmartHome`, `MQTT_ENABLED=true`, ...).



![Edit ec2.env.template in VS Code](/images/workshop/5.6-01-ec2-env-template.png)



---



## Step 2 — Automated deploy (PowerShell — recommended)



```powershell

cd SmartHome_IoT-main



.\infrastructure\scripts\deploy-all.ps1 `

  -Ec2Host "EC2_PUBLIC_IP" `

  -KeyPath ".\infrastructure\keys\smarthome-key.pem"

```



Script performs:



1. SSH verify EC2

2. Upload `backend/` (exclude `node_modules`, `data`, local `.env`)

3. Upload `infrastructure/` + IoT cert in `backend/certs/`

4. Copy `ec2.env.template` → `/opt/smarthome/backend/.env`

5. Run `ec2-setup.sh`: `npm install`, Nginx, PM2 (`smarthome-backend`, `virtual-esp32`)

6. `npm run build` frontend with `VITE_API_URL=http://EC2_IP`

7. Upload `dist/` → `/opt/smarthome/dist/`, reload Nginx



![deploy-all.ps1 completed successfully](/images/workshop/5.6-02-deploy-all-script.png)



**Frontend only redeploy:**



```powershell

.\infrastructure\scripts\deploy-all.ps1 -Ec2Host "EC2_IP" -KeyPath ".\infrastructure\keys\smarthome-key.pem" -SkipBackend

```



**Backend only redeploy:**



```powershell

.\infrastructure\scripts\deploy-all.ps1 -Ec2Host "EC2_IP" -KeyPath ".\infrastructure\keys\smarthome-key.pem" -SkipFrontend

```



---



## Step 3 — Verify on EC2 (Console + SSH)



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



Expected:



| Process | Status |

|---------|--------|

| `smarthome-backend` | online |

| `virtual-esp32` | online (MQTT connected) |





### 3.3 Nginx



```bash

sudo nginx -t

sudo systemctl status nginx

ls -la /opt/smarthome/dist/

```





**Console:** EC2 → instance → open **Public IP** in browser — may see React page (or 502 if backend not ready).





---



## Step 4 — Nginx configuration (Console / SSH reference)



Sample file: `infrastructure/nginx/smarthome.conf` — script `ec2-setup.sh` copies to `/etc/nginx/conf.d/`.



Main content:



- `location /` → `/opt/smarthome/dist` (SPA)

- `location /api/` → `http://127.0.0.1:5000`



![nginx smarthome.conf on EC2](/images/workshop/5.6-07-nginx-config.png)



---



## Step 5 — Upload IoT cert (if manual deploy)



If not using script, ensure on EC2:



```

/opt/smarthome/backend/certs/          ← YoloHomeBackend

/opt/smarthome/backend/certs-device/   ← YoloUNODevice

```





---



## Step 5.6 checklist



| # | Item | Status |

|---|------|--------|

| 1 | `ec2.env.template` fully filled | ☐ |

| 2 | `deploy-all.ps1` ran successfully | ☐ |

| 3 | `pm2 status` — backend + virtual-esp32 online | ☐ |

| 4 | Nginx serving `/opt/smarthome/dist` | ☐ |

| 5 | IoT cert present on EC2 | ☐ |

