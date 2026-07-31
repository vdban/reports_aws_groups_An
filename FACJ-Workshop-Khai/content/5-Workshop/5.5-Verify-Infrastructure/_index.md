---

title: "5.5 Verify Infrastructure"

date: 2026-07-01

weight: 5

chapter: false

pre: " <b>  </b> "

---



# Verify infrastructure on AWS Console



After stack `CREATE_COMPLETE`, confirm each service before deploying the application.



---



## 5.5.1 DynamoDB



1. **DynamoDB** → **Tables** → table **`SmartHome`**.

2. Verify:

   - **Partition key:** `pk` (String)

   - **Sort key:** `sk` (String)

   - **Capacity mode:** On-demand



![DynamoDB SmartHome table](/images/workshop/5.5-01-dynamodb-table.png)



![DynamoDB pk/sk schema](/images/workshop/5.5-02-dynamodb-schema.png)



> Data appears after backend runs and virtual-esp32 sends telemetry.



---



## 5.5.2 Amazon Cognito



1. **Cognito** → **User pools** → pool **`smarthome-users`** (or name per `ProjectName`).

2. **Users** tab → user **`admin`** created by stack.

3. **App integration** tab → **App clients** → copy **Client ID** (matches Output `CognitoClientId`).

4. **Groups** tab → groups **`admin`** and **`user`** exist.



![Cognito User Pool smarthome](/images/workshop/5.5-03-cognito-user-pool.png)



![Admin user in Cognito](/images/workshop/5.5-04-cognito-admin-user.png)



![Cognito groups admin and user](/images/workshop/5.5-05-cognito-groups.png)



---



## 5.5.3 Amazon EC2



1. **EC2** → **Instances** → instance tagged **`smarthome-backend`**.

2. Verify:

   - **State:** Running

   - **Public IPv4 address** = Output `EC2PublicIP`

   - **IAM role:** `smarthome-ec2-role`

   - **Key pair:** `smarthome-key`



![EC2 instance smarthome-backend Running](/images/workshop/5.5-06-ec2-instance.png)



3. **Security** tab → **Security groups** → inbound rules: **22**, **80**, **443**.



![Security Group inbound 22 80 443](/images/workshop/5.5-07-ec2-security-group.png)



4. **Connect** → try **EC2 Instance Connect** or **Session Manager** (role has `AmazonSSMManagedInstanceCore`).





---



## 5.5.4 CloudWatch



1. **CloudWatch** → **Log groups**:

   - `/smarthome/audit`

   - `/smarthome/app`

   - `/smarthome/cognito`



![CloudWatch log groups smarthome](/images/workshop/5.5-09-cloudwatch-log-groups.png)



2. **Dashboards** → **`smarthome-dashboard`** (link also in CFN Output).



![CloudWatch dashboard smarthome](/images/workshop/5.5-10-cloudwatch-dashboard.png)



3. **Alarms** → alarm **`smarthome-login-failed`**.



![CloudWatch alarm login failed](/images/workshop/5.5-11-cloudwatch-alarm.png)



---



## 5.5.5 EC2 IAM Role



1. **IAM** → **Roles** → **`smarthome-ec2-role`**.

2. Confirm inline policy for DynamoDB, Cognito, IoT, CloudWatch Logs.



