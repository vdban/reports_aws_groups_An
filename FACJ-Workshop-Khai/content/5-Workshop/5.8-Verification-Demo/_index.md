---

title: "5.8 Verification & Demo"

date: 2026-07-01

weight: 8

chapter: false

pre: " <b>  </b> "

---



# Post-deploy verification & Demo



Confirm the system works end-to-end before submitting the report or demoing with mentor.



---



## Step 1 — Health check API



**From local machine (PowerShell):**



```powershell

Invoke-RestMethod http://EC2_PUBLIC_IP/api/health

```



Expected result:



```json

{

  "status": "ok",

  "db": "dynamodb",

  "auth": "cognito",

  "mqtt": true,

  "devSimulator": false

}

```





> `mqtt: false` → check IoT cert in `/opt/smarthome/backend/certs/` and policy attached to Thing `YoloHomeBackend`.



**On EC2 (SSH):**



```bash

curl http://localhost/api/health

curl http://localhost:5000/api/health

```





---



## Step 2 — Open dashboard in browser



Access:



```

http://EC2_PUBLIC_IP

```



![SmartHome dashboard login page](/images/workshop/5.8-03-login-page.png)



Login:



- **Admin:** `admin` / `Admin@Demo2024`

- **User:** `user1` / `User1@Demo2024`



![Dashboard after admin login](/images/workshop/5.8-04-dashboard-overview.png)



---



## Step 3 — Verify real-time sensor data



Virtual ESP32 (PM2) sends telemetry via MQTT → backend updates DynamoDB → UI SSE.



1. Open **Overview** / **Rooms** page — view temperature, humidity, light.

2. **Log** tab — update events.



![Sensor data on dashboard](/images/workshop/5.8-05-sensor-data.png)



**CloudWatch Console:** Log group `/smarthome/app` — backend MQTT receive logs.





---



## Step 4 — Device control



On UI, try toggling:



| Device | Room | Badge |

|--------|------|-------|

| Light | Living Room | IoT |

| Fan | Living Room | IoT |

| Door | Bedroom 1 | IoT |



![Light/fan control on UI](/images/workshop/5.8-07-device-toggle.png)



**DynamoDB Console:** **Explore table items** — see updated settings/device records.





---



## Step 5 — Admin vs user permissions



1. Log out → login as **`user1`**.

2. Regular user **does not** see **Users** page (user management).

3. Login again as **`admin`** → has **Users** menu.



![Admin has Users page](/images/workshop/5.8-9-not-page.png)



![Users page for admin](/images/workshop/5.8-10-admin-users-page.png)



---



## Step 6 — CloudWatch dashboard



Open link from CloudFormation Output **`CloudWatchDashboard`** or:



**CloudWatch** → **Dashboards** → **`smarthome-dashboard`**



![CloudWatch dashboard login fail + logs](/images/workshop/5.8-11-cloudwatch-dashboard-live.png)



---



## Complete demo checklist



```

□ curl /api/health → db=dynamodb, auth=cognito, mqtt=true

□ Admin login successful

□ Sensors display real-time

□ Light/fan/door toggle works

□ pm2 logs virtual-esp32 → connected

□ CloudWatch has audit/app logs

```

