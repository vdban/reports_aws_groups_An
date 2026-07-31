---
title: "5.8 Kiểm tra & Demo"
date: 2026-07-01
weight: 8
chapter: false
pre: " <b>  </b> "
---

# Kiểm tra sau deploy & Demo

Xác nhận hệ thống hoạt động end-to-end trước khi nộp báo cáo hoặc demo với mentor.

---

## Bước 1 — Health check API

**Từ máy local (PowerShell):**

```powershell
Invoke-RestMethod http://EC2_PUBLIC_IP/api/health
```

Kết quả mong đợi:

```json
{
  "status": "ok",
  "db": "dynamodb",
  "auth": "cognito",
  "mqtt": true,
  "devSimulator": false
}
```


> `mqtt: false` → kiểm tra cert IoT trong `/opt/smarthome/backend/certs/` và policy attach đúng Thing `YoloHomeBackend`.

**Trên EC2 (SSH):**

```bash
curl http://localhost/api/health
curl http://localhost:5000/api/health
```


---

## Bước 2 — Mở dashboard trên browser

Truy cập:

```
http://EC2_PUBLIC_IP
```

![Trang login SmartHome dashboard](/images/workshop/5.8-03-login-page.png)

Đăng nhập:

- **Admin:** `admin` / `Admin@Demo2024`
- **User:** `user1` / `User1@Demo2024`

![Dashboard sau đăng nhập admin](/images/workshop/5.8-04-dashboard-overview.png)

---

## Bước 3 — Kiểm tra sensor real-time

Virtual ESP32 (PM2) gửi telemetry qua MQTT → backend cập nhật DynamoDB → UI SSE.

1. Mở trang **Overview** / **Rooms** — xem nhiệt độ, độ ẩm, ánh sáng.
2. Tab **Log** — sự kiện cập nhật.

![Sensor data trên dashboard](/images/workshop/5.8-05-sensor-data.png)

**Console CloudWatch:** Log group `/smarthome/app` — log backend nhận MQTT.


---

## Bước 4 — Điều khiển thiết bị

Trên UI, thử bật/tắt:

| Thiết bị | Phòng | Badge |
|----------|-------|-------|
| Đèn | Phòng Khách | IoT |
| Quạt | Phòng Khách | IoT |
| Cửa | Phòng Ngủ 1 | IoT |

![Điều khiển đèn quạt trên UI](/images/workshop/5.8-07-device-toggle.png)

**DynamoDB Console:** **Explore table items** — thấy record settings/device cập nhật.


---

## Bước 5 — Phân quyền admin vs user

1. Đăng xuất → login **`user1`**.
2. User thường **không** thấy trang **Users** (quản lý user).
3. Login lại **`admin`** → có menu **Users**.

![Admin có Users page](/images/workshop/5.8-9-not-page.png)

![Users không có Users Page](/images/workshop/5.8-10-admin-users-page.png)

---

## Bước 6 — CloudWatch dashboard

Mở link từ CloudFormation Output **`CloudWatchDashboard`** hoặc:

**CloudWatch** → **Dashboards** → **`smarthome-dashboard`**

![Dashboard CloudWatch login fail + logs](/images/workshop/5.8-11-cloudwatch-dashboard-live.png)

---

## Checklist demo hoàn chỉnh

```
□ curl /api/health → db=dynamodb, auth=cognito, mqtt=true
□ Login admin thành công
□ Sensor hiển thị real-time
□ Toggle đèn/quạt/cửa hoạt động
□ pm2 logs virtual-esp32 → connected
□ CloudWatch có log audit/app
```
