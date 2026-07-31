---
title: "Week 5 - Worklog"
date: 2026-07-06
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

### Week 5 goals:

* Launch and manage **Amazon EC2** in the VPC lab.
* Attach **IAM Role for EC2** instead of hard-coded access keys.
* I **plan backend hosting** for SmartHome_IoT on EC2 (stack, env, cost).
* Team meeting: align backend deployment strategy for the project phase.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Learn EC2: AMI, instance type, key pair, EBS <br> - Launch t3.micro in public subnet; Quỳnh assists with configuration | 06/07/2026 | 06/07/2026 | <https://docs.aws.amazon.com/ec2/> |
| 2 | - SSH into instance; install Node.js runtime for Công's backend <br> - Verify connectivity via Security Group | 07/07/2026 | 07/07/2026 | <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html> |
| 3 | - Create **IAM Role for EC2** (`smarthome-ec2-app`); attach minimal S3/CloudWatch permissions <br> - Verify AWS CLI on EC2 works without static keys | 08/07/2026 | 08/07/2026 | <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html> |
| 4 | - Draft **Backend Hosting Strategy**: env config, reverse proxy, stop/start cost policy <br> - Review with Công (backend) and Quỳnh (DevOps) | 09/07/2026 | 09/07/2026 | SmartHome_IoT repo |
| 5 | - **Team meeting:** confirm EC2 as MVP backend host; assign week 6 modules <br> - Security checklist (no committed keys, use Roles, stop when not in lab) | 10/07/2026 | 10/07/2026 | SmartHome_IoT repo |

### Week 5 outcomes:

* **EC2** lab accessible via SSH within the VPC.
* **IAM Roles for EC2** applied successfully — no static keys on the instance.
* **Backend hosting plan** documented and agreed with the team.
* Ready to start project delivery and DB design from week 6.
