---
title: "5.3 AWS IoT Core"
date: 2026-07-01
weight: 3
chapter: false
pre: " <b> </b> "
---

# Cấu hình AWS IoT Core (Console)

Backend và thiết bị giao tiếp qua **MQTT** trên **AWS IoT Core**. Cần **1 Policy** và **2 Thing** (Backend + Device), mỗi Thing có certificate riêng.

File policy mẫu trong repo: `SmartHome_IoT-main/infrastructure/iot/iot-policy.json`.

---

## Bước 1 — Tạo IoT Policy

1. Console → **IoT Core** → **Security** → **Policies** → **Create policy**.
2. **Policy name:** `SmartHomeDevicePolicy`
3. **Policy document:** dán nội dung từ `iot-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["iot:Connect"],
      "Resource": "arn:aws:iot:ap-southeast-2:*:client/*"
    },
    {
      "Effect": "Allow",
      "Action": ["iot:Publish", "iot:Receive"],
      "Resource": [
        "arn:aws:iot:ap-southeast-2:*:topic/device/*",
        "arn:aws:iot:ap-southeast-2:*:topicfilter/device/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": ["iot:Subscribe"],
      "Resource": "arn:aws:iot:ap-southeast-2:*:topicfilter/device/*"
    }
  ]
}
```

4. **Create**.

![Tạo IoT Policy SmartHomeDevicePolicy](/images/workshop/5.3-01-iot-policy-create.png)

![IoT Policy document đã lưu](/images/workshop/5.3-02-iot-policy-saved.png)

---

## Bước 2 — Tạo Thing `YoloHomeBackend` (backend EC2)

1. **IoT Core** → **Manage** → **All devices** → **Things** → **Create things**.
2. **Create single thing** → **Thing name:** `YoloHomeBackend`
3. **Auto-generate a new certificate** → **Active** certificate.
4. **Attach policies** → chọn `SmartHomeDevicePolicy`.
5. **Create thing** → **Download** 3 file certificate.

![Tạo Thing YoloHomeBackend](/images/workshop/5.3-03-thing-backend-create.png)


6. Đổi tên 3 file và đặt vào `SmartHome_IoT-main/backend/certs/`:

| File tải về | Đổi tên thành |
|-------------|---------------|
| `*-private.pem.key` | `private.pem.key` |
| `*-certificate.pem.crt` | `device.pem.crt` |
| `AmazonRootCA1.pem` (hoặc root CA) | `root-CA.crt` |

![Thư mục backend/certs/](/images/workshop/5.3-05-backend-certs-folder.png)

**Client ID MQTT:** `YoloHomeBackend` (khớp tên Thing).

---

## Bước 3 — Tạo Thing `YoloUNODevice` (ESP32 / virtual device)

Lặp lại quy trình Bước 2 với:

- **Thing name:** `YoloUNODevice`
- **Client ID:** `YoloUNODevice`
- Lưu cert vào `SmartHome_IoT-main/backend/certs-device/`

![Tạo Thing YoloUNODevice](/images/workshop/5.3-06-thing-device-create.png)

![Thư mục backend/certs-device/](/images/workshop/5.3-07-device-certs-folder.png)

> Trích cert cho firmware ESP32: `cd backend && npm run extract-certs`

---

## Bước 4 — Kiểm tra certificate & policy trên Console

1. **Security** → **Certificates** → trạng thái **Active**.
2. Mỗi certificate → tab **Policies** → có `SmartHomeDevicePolicy`.
3. **Things** → mỗi Thing → tab **Certificates** → cert đã gắn.

![Danh sách certificate Active](/images/workshop/5.3-08-certificates-active.png)

![Policy attached to certificate](/images/workshop/5.3-09-cert-policy-attached.png)

---

## Bước 5 — Lấy IoT Data endpoint

1. **IoT Core** → **Settings** (menu trái).
2. Copy **Device data endpoint** (dạng `xxxxx-ats.iot.ap-southeast-2.amazonaws.com`).

![IoT Data endpoint trên Settings](/images/workshop/5.3-10-iot-endpoint.png)

**Hoặc CLI:**

```powershell
aws iot describe-endpoint --endpoint-type iot:Data-ATS --region ap-southeast-2 `
  --query endpointAddress --output text
```

Ghi endpoint — dùng trong `infrastructure/ec2.env.template` (`IOT_ENDPOINT=...`).

---

## Checklist bước 5.3

| # | Hạng mục | Trạng thái |
|---|----------|------------|
| 1 | Policy `SmartHomeDevicePolicy` | ☐ |
| 2 | Thing `YoloHomeBackend` + cert → `backend/certs/` | ☐ |
| 3 | Thing `YoloUNODevice` + cert → `backend/certs-device/` | ☐ |
| 4 | IoT endpoint đã ghi lại | ☐ |
