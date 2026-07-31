---
title: "5.5 Kiểm tra hạ tầng"
date: 2026-07-01
weight: 5
chapter: false
pre: " <b>  </b> "
---

# Kiểm tra hạ tầng trên AWS Console

Sau khi stack `CREATE_COMPLETE`, xác nhận từng dịch vụ trước khi deploy ứng dụng.

---

## 5.5.1 DynamoDB

1. **DynamoDB** → **Tables** → bảng **`SmartHome`**.
2. Kiểm tra:
   - **Partition key:** `pk` (String)
   - **Sort key:** `sk` (String)
   - **Capacity mode:** On-demand

![Bảng DynamoDB SmartHome](/images/workshop/5.5-01-dynamodb-table.png)

![Schema pk/sk DynamoDB](/images/workshop/5.5-02-dynamodb-schema.png)

> Dữ liệu sẽ xuất hiện sau khi backend chạy và virtual-esp32 gửi telemetry.

---

## 5.5.2 Amazon Cognito

1. **Cognito** → **User pools** → pool **`smarthome-users`** (hoặc tên theo `ProjectName`).
2. Tab **Users** → user **`admin`** đã được stack tạo.
3. Tab **App integration** → **App clients** → copy **Client ID** (khớp Output `CognitoClientId`).
4. Tab **Groups** → có nhóm **`admin`** và **`user`**.

![Cognito User Pool smarthome](/images/workshop/5.5-03-cognito-user-pool.png)

![User admin trong Cognito](/images/workshop/5.5-04-cognito-admin-user.png)

![Cognito groups admin và user](/images/workshop/5.5-05-cognito-groups.png)

---

## 5.5.3 Amazon EC2

1. **EC2** → **Instances** → instance tag **`smarthome-backend`**.
2. Kiểm tra:
   - **State:** Running
   - **Public IPv4 address** = Output `EC2PublicIP`
   - **IAM role:** `smarthome-ec2-role`
   - **Key pair:** `smarthome-key`

![EC2 instance smarthome-backend Running](/images/workshop/5.5-06-ec2-instance.png)

3. Tab **Security** → **Security groups** → inbound rules: **22**, **80**, **443**.

![Security Group inbound 22 80 443](/images/workshop/5.5-07-ec2-security-group.png)

4. **Connect** → thử **EC2 Instance Connect** hoặc **Session Manager** (role có `AmazonSSMManagedInstanceCore`).


---

## 5.5.4 CloudWatch

1. **CloudWatch** → **Log groups**:
   - `/smarthome/audit`
   - `/smarthome/app`
   - `/smarthome/cognito`

![CloudWatch log groups smarthome](/images/workshop/5.5-09-cloudwatch-log-groups.png)

2. **Dashboards** → **`smarthome-dashboard`** (link cũng có trong CFN Output).

![CloudWatch dashboard smarthome](/images/workshop/5.5-10-cloudwatch-dashboard.png)

3. **Alarms** → alarm **`smarthome-login-failed`**.

![CloudWatch alarm login failed](/images/workshop/5.5-11-cloudwatch-alarm.png)

---

## 5.5.5 IAM Role EC2

1. **IAM** → **Roles** → **`smarthome-ec2-role`**.
2. Xác nhận policy inline cho DynamoDB, Cognito, IoT, CloudWatch Logs.

