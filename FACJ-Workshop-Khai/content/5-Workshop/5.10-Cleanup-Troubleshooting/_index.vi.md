---
title: "5.10 Dọn dẹp & xử lý lỗi"
date: 2026-07-01
weight: 10
chapter: false
pre: " <b> </b> "
---

# Dọn dẹp, reset & Troubleshooting

---

## Dọn dẹp tài nguyên AWS (Console)

> **Cảnh báo:** Xóa stack sẽ xóa EC2, DynamoDB, Cognito, CloudWatch — **không phục hồi được**.

### Xóa CloudFormation stack

1. **CloudFormation** → chọn **`smarthome-stack`** → **Delete**.
2. Đợi status **`DELETE_COMPLETE`**.

![Xóa stack smarthome-stack](/images/workshop/5.10-01-delete-stack.png)

### Xóa IoT Core (thủ công)

Stack không xóa IoT Things/Certs — làm thủ công nếu cần:

1. **IoT Core** → **Things** → detach cert → delete thing.
2. **Certificates** → deactivate → delete.
3. **Policies** → delete `SmartHomeDevicePolicy`.

![Xóa IoT Thing và certificate](/images/workshop/5.10-02-delete-iot-resources.png)
![delete polycies iot](/images/workshop/5.10-04-delete-iot-polycies.png)
### Xóa EC2 Key Pair (tuỳ chọn)

**EC2** → **Key pairs** → delete `smarthome-key` (chỉ khi không còn instance dùng key).

![delete key pair](/images/workshop/5.10-03-delete-key-pair.png)

---

## Reset & deploy lại

| Tình huống | Cách làm |
|------------|----------|
| Sửa UI | `deploy-all.ps1 -SkipBackend` |
| Sửa API | `deploy-all.ps1 -SkipFrontend` |
| Đổi EC2 IP | Sửa `ec2.env.template` + redeploy frontend |
| Login fail production | Seed Cognito / reset password Console |
| Stack ROLLBACK | Delete stack → sửa key/VPC → deploy lại |
| Reset Cognito password | `init-cognito-admin.ps1` hoặc Console Set password |


---

## Bảng Troubleshooting

| Triệu chứng | Nguyên nhân | Cách fix |
|-------------|-------------|----------|
| Stack **ROLLBACK_COMPLETE** | Key pair sai, Subnet/VPC lỗi | Xem Events CFN, xóa stack, deploy lại |
| SSH **bad permissions** (.pem) | Quyền file key Windows | `icacls` như bước 5.2 |
| **502 Bad Gateway** | Backend PM2 chưa chạy | `pm2 restart smarthome-backend` |
| Trang **trắng** | `dist/` trống hoặc build sai URL | Redeploy frontend với đúng `VITE_API_URL` |
| **CORS error** | Sai `CORS_ORIGIN` | Khớp `http://EC2_IP` trong `.env` |
| `mqtt: false` trong health | Cert IoT thiếu/sai policy | Kiểm tra `backend/certs/` trên EC2 |
| **virtual-esp32 errored** | Trùng Client ID hoặc cert device | `pm2 logs virtual-esp32`, stop ESP32 thật |
| Login Cognito fail | Chưa set password / sai policy | Console → Users → Set password |
| DynamoDB empty | Backend chưa ghi / MQTT chưa connect | Kiểm tra PM2 + IoT endpoint |



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

![AWS Cost Explorer sau demo](/images/workshop/5.10-06-cost-explorer.png)

---

## Tài liệu tham khảo

- README dự án: `SmartHome_IoT-main/README.md`
- CloudFormation: `infrastructure/cloudformation/smarthome-stack.yaml`
- IoT policy: `infrastructure/iot/iot-policy.json`
- Nginx: `infrastructure/nginx/smarthome.conf`
