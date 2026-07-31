---
title: "5.2 Chuẩn bị AWS"
date: 2026-07-01
weight: 2
chapter: false
pre: " <b>  </b> "
---

# Chuẩn bị AWS trước khi deploy

Làm **một lần** trước khi triển khai production. Tất cả thao tác trên **AWS Management Console**, region **`ap-southeast-2`**.

---

## Bước 1 — Chọn region

1. Đăng nhập [AWS Management Console](https://console.aws.amazon.com/).
2. Góc trên bên phải → chọn **Asia Pacific (Sydney) `ap-southeast-2`**.

![Chọn region ap-southeast-2](/images/workshop/5.2-01-region.png)


---

## Bước 2 — Kiểm tra IAM User / quyền

IAM User (hoặc role) cần quyền tối thiểu:

- CloudFormation (create/delete stack)
- EC2 (instances, key pairs, security groups)
- DynamoDB, Cognito, IoT, CloudWatch Logs

**Console:** **IAM** → **Users** → chọn user → tab **Permissions**.

![Kiểm tra quyền IAM User](/images/workshop/5.2-02-iam-permissions.png)

**Tuỳ chọn — xác minh bằng CLI:**

```powershell
aws sts get-caller-identity
aws configure   # Access Key, Secret, region ap-southeast-2, output json
```

---

## Bước 3 — Default VPC

CloudFormation template `smarthome-stack.yaml` cần **default VPC** và **public subnet**.

1. **VPC** → **Your VPCs** → tìm VPC có cột **Default VPC** = `Yes`.
2. Nếu chưa có: **Actions** → **Create default VPC** (hoặc CLI `aws ec2 create-default-vpc --region ap-southeast-2`).

![Default VPC trong Console](/images/workshop/5.2-04-default-vpc.png)

3. **Subnets** → lọc VPC default → ghi **Subnet ID** public (route tới Internet Gateway).

![Public subnet default VPC](/images/workshop/5.2-05-public-subnet.png)

---

## Bước 4 — Tạo EC2 Key Pair

Key pair dùng SSH vào EC2 sau khi stack tạo instance.

1. **EC2** → **Network & Security** → **Key pairs** → **Create key pair**.
2. Cấu hình:
   - **Name:** `smarthome-key`
   - **Key pair type:** RSA
   - **Private key format:** `.pem` (Linux/Mac) hoặc `.ppk` (PuTTY)
3. **Create** → tải file `.pem` về máy.

![Tạo EC2 Key Pair smarthome-key](/images/workshop/5.2-06-create-keypair.png)

4. Lưu tại `SmartHome_IoT-main/infrastructure/keys/smarthome-key.pem` — **không commit Git**.

![Vị trí lưu file .pem](/images/workshop/5.2-07-keypair-folder.png)

**Windows — sửa quyền file key (bắt buộc để SSH):**

```powershell
icacls infrastructure\keys\smarthome-key.pem /inheritance:r
icacls infrastructure\keys\smarthome-key.pem /grant:r "$env:USERNAME:(R)"
```

---

## Bước 5 — (Tuỳ chọn) AWS Budgets

Giới hạn chi phí lab:

1. **Billing** → **Budgets** → **Create budget**.
2. Chọn **Cost budget** → ví dụ **5 USD/tháng** → email cảnh báo 80% / 100%.

![Tạo AWS Budget cho lab](/images/workshop/5.2-08-budget.png)

---

## Checklist bước 5.2

| # | Hạng mục | Trạng thái |
|---|----------|------------|
| 1 | Region = `ap-southeast-2` | ☐ |
| 2 | IAM đủ quyền CFN/EC2/DynamoDB/Cognito/IoT | ☐ |
| 3 | Default VPC + public subnet | ☐ |
| 4 | Key pair `smarthome-key` + file `.pem` an toàn | ☐ |
