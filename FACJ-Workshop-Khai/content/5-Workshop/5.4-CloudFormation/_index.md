---

title: "5.4 CloudFormation"

date: 2026-07-01

weight: 4

chapter: false

pre: " <b> </b> "

---



# Deploy infrastructure with CloudFormation



Template `SmartHome_IoT-main/infrastructure/cloudformation/smarthome-stack.yaml` creates:



- **DynamoDB** table `SmartHome`

- **Cognito** User Pool + client + groups `admin` / `user` + user `admin`

- **EC2** t3.micro (Amazon Linux 2023) + Security Group (22, 80, 443)

- **IAM Role** for EC2 (DynamoDB, Cognito, IoT, CloudWatch)

- **CloudWatch** log groups, metric filter, alarm, dashboard



Deploy via **Console** or script `deploy-stack.ps1`.



---



## Method A — Deploy on AWS Console (recommended for workshop)



### Step 1 — Open CloudFormation



1. Console → **CloudFormation** → **Create stack** → **With new resources**.

2. **Template source:** **Upload a template file**.

3. Select `infrastructure/cloudformation/smarthome-stack.yaml` from repo.





### Step 2 — Stack name & parameters



**Stack name:** `smarthome-stack`



| Parameter | Suggested value |

|-----------|-----------------|

| `ProjectName` | `smarthome` |

| `KeyPairName` | `smarthome-key` (created in step 5.2) |

| `AllowedSSHIp` | Your IP `/32` (or `0.0.0.0/0` for lab — not recommended for production) |

| `InstanceType` | `t3.micro` |

| `VpcId` | Default VPC ID |

| `SubnetId` | Public subnet ID |





> **Get VpcId / SubnetId:** VPC → Your VPCs / Subnets (step 5.2).



### Step 3 — Stack options



Keep defaults → **Next** → tick **I acknowledge that AWS CloudFormation might create IAM resources** → **Submit**.





### Step 4 — Monitor progress



**Events** tab — wait for **Stack status** = `CREATE_COMPLETE` (5–10 minutes).





If **ROLLBACK_COMPLETE**: check **Events** tab (common errors: wrong key pair name, SubnetId not in VpcId). Delete stack and redeploy.





### Step 5 — Record Outputs



**Outputs** tab — copy these values:



| Output | Used for |

|--------|----------|

| `EC2PublicIP` | SSH, web URL, `CORS_ORIGIN`, `VITE_API_URL` |

| `WebURL` | Access dashboard |

| `CognitoUserPoolId` | `COGNITO_USER_POOL_ID` |

| `CognitoClientId` | `COGNITO_CLIENT_ID` |

| `DynamoDBTable` | Confirm table name |

| `CloudWatchDashboard` | Monitoring dashboard link |





---



## Method B — Deploy with script (PowerShell)



```powershell

cd SmartHome_IoT-main

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass



.\infrastructure\scripts\deploy-stack.ps1 `

  -KeyPairName smarthome-key `

  -AdminPassword "Admin@Demo2024"

```



Script auto-fetches VpcId/SubnetId and sets Cognito admin password.



![Run deploy-stack.ps1](/images/workshop/5.4-07-deploy-stack-script.png)



---



## Delete failed stack before redeploy



**CloudFormation** → select `smarthome-stack` → **Delete** → wait for `DELETE_COMPLETE`.



