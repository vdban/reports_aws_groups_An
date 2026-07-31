---

title: "5.2 AWS Prerequisites"

date: 2026-07-01

weight: 2

chapter: false

pre: " <b>  </b> "

---



# Prepare AWS before deploy



Do this **once** before production deployment. All steps on **AWS Management Console**, region **`ap-southeast-2`**.



---



## Step 1 — Select region



1. Sign in to [AWS Management Console](https://console.aws.amazon.com/).

2. Top-right → select **Asia Pacific (Sydney) `ap-southeast-2`**.



![Select region ap-southeast-2](/images/workshop/5.2-01-region.png)





---



## Step 2 — Verify IAM User / permissions



IAM User (or role) needs minimum permissions:



- CloudFormation (create/delete stack)

- EC2 (instances, key pairs, security groups)

- DynamoDB, Cognito, IoT, CloudWatch Logs



**Console:** **IAM** → **Users** → select user → **Permissions** tab.



![Verify IAM User permissions](/images/workshop/5.2-02-iam-permissions.png)



**Optional — verify via CLI:**



```powershell

aws sts get-caller-identity

aws configure   # Access Key, Secret, region ap-southeast-2, output json

```



---



## Step 3 — Default VPC



CloudFormation template `smarthome-stack.yaml` requires **default VPC** and **public subnet**.



1. **VPC** → **Your VPCs** → find VPC with **Default VPC** = `Yes`.

2. If missing: **Actions** → **Create default VPC** (or CLI `aws ec2 create-default-vpc --region ap-southeast-2`).



![Default VPC in Console](/images/workshop/5.2-04-default-vpc.png)



3. **Subnets** → filter default VPC → note **Subnet ID** of public subnet (route to Internet Gateway).



![Public subnet default VPC](/images/workshop/5.2-05-public-subnet.png)



---



## Step 4 — Create EC2 Key Pair



Key pair is used for SSH into EC2 after the stack creates the instance.



1. **EC2** → **Network & Security** → **Key pairs** → **Create key pair**.

2. Configure:

   - **Name:** `smarthome-key`

   - **Key pair type:** RSA

   - **Private key format:** `.pem` (Linux/Mac) or `.ppk` (PuTTY)

3. **Create** → download `.pem` file.



![Create EC2 Key Pair smarthome-key](/images/workshop/5.2-06-create-keypair.png)



4. Save to `SmartHome_IoT-main/infrastructure/keys/smarthome-key.pem` — **do not commit to Git**.



![Key file save location](/images/workshop/5.2-07-keypair-folder.png)



**Windows — fix key file permissions (required for SSH):**



```powershell

icacls infrastructure\keys\smarthome-key.pem /inheritance:r

icacls infrastructure\keys\smarthome-key.pem /grant:r "$env:USERNAME:(R)"

```



---



## Step 5 — (Optional) AWS Budgets



Limit lab costs:



1. **Billing** → **Budgets** → **Create budget**.

2. Select **Cost budget** → e.g. **5 USD/month** → email alerts at 80% / 100%.



![Create AWS Budget for lab](/images/workshop/5.2-08-budget.png)



---



## Step 5.2 checklist



| # | Item | Status |

|---|------|--------|

| 1 | Region = `ap-southeast-2` | ☐ |

| 2 | IAM has CFN/EC2/DynamoDB/Cognito/IoT permissions | ☐ |

| 3 | Default VPC + public subnet | ☐ |

| 4 | Key pair `smarthome-key` + `.pem` file secured | ☐ |

