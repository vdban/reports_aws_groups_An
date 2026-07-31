---
title: "5.4 CloudFormation"
date: 2026-07-01
weight: 4
chapter: false
pre: " <b> </b> "
---

# Deploy hạ tầng bằng CloudFormation

Template `SmartHome_IoT-main/infrastructure/cloudformation/smarthome-stack.yaml` tạo:

- **DynamoDB** table `SmartHome`
- **Cognito** User Pool + client + groups `admin` / `user` + user `admin`
- **EC2** t3.micro (Amazon Linux 2023) + Security Group (22, 80, 443)
- **IAM Role** cho EC2 (DynamoDB, Cognito, IoT, CloudWatch)
- **CloudWatch** log groups, metric filter, alarm, dashboard

Có thể deploy qua **Console** hoặc script `deploy-stack.ps1`.

---

## Cách A — Deploy trên AWS Console (khuyến nghị cho workshop)

### Bước 1 — Mở CloudFormation

1. Console → **CloudFormation** → **Create stack** → **With new resources**.
2. **Template source:** **Upload a template file**.
3. Chọn file `infrastructure/cloudformation/smarthome-stack.yaml` từ repo.


### Bước 2 — Đặt tên stack & tham số

**Stack name:** `smarthome-stack`

| Parameter | Giá trị gợi ý |
|-----------|---------------|
| `ProjectName` | `smarthome` |
| `KeyPairName` | `smarthome-key` (đã tạo ở bước 5.2) |
| `AllowedSSHIp` | IP máy bạn `/32` (hoặc `0.0.0.0/0` cho lab — không khuyến nghị production) |
| `InstanceType` | `t3.micro` |
| `VpcId` | Default VPC ID |
| `SubnetId` | Public subnet ID |


> **Lấy VpcId / SubnetId:** VPC → Your VPCs / Subnets (bước 5.2).

### Bước 3 — Cấu hình stack options

Giữ mặc định → **Next** → tick **I acknowledge that AWS CloudFormation might create IAM resources** → **Submit**.


### Bước 4 — Theo dõi tiến trình

Tab **Events** — đợi **Stack status** = `CREATE_COMPLETE` (5–10 phút).


Nếu **ROLLBACK_COMPLETE**: xem tab **Events** (lỗi thường gặp: key pair sai tên, SubnetId không thuộc VpcId). Xóa stack và deploy lại.


### Bước 5 — Ghi lại Outputs

Tab **Outputs** — copy các giá trị sau:

| Output | Dùng cho |
|--------|----------|
| `EC2PublicIP` | SSH, URL web, `CORS_ORIGIN`, `VITE_API_URL` |
| `WebURL` | Truy cập dashboard |
| `CognitoUserPoolId` | `COGNITO_USER_POOL_ID` |
| `CognitoClientId` | `COGNITO_CLIENT_ID` |
| `DynamoDBTable` | Xác nhận tên bảng |
| `CloudWatchDashboard` | Link dashboard giám sát |


---

## Cách B — Deploy bằng script (PowerShell)

```powershell
cd SmartHome_IoT-main
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

.\infrastructure\scripts\deploy-stack.ps1 `
  -KeyPairName smarthome-key `
  -AdminPassword "Admin@Demo2024"
```

Script tự lấy VpcId/SubnetId và set mật khẩu admin Cognito.

![Chạy deploy-stack.ps1](/images/workshop/5.4-07-deploy-stack-script.png)

---

## Xóa stack lỗi trước khi deploy lại

**CloudFormation** → chọn `smarthome-stack` → **Delete** → đợi `DELETE_COMPLETE`.

