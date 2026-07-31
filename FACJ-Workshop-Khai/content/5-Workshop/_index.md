---

title: "Workshop"

date: 2026-07-01

weight: 5

chapter: false

pre: " <b> 5. </b> "

---



# Workshop — Deploy SmartHome_IoT on AWS



This workshop documents the **SmartHome_IoT deployment workflow** on AWS, based on the project README and source in `SmartHome_IoT-main/`. Steps focus on the **AWS Management Console**, with **illustration image paths** — capture screenshots and place files in `content/images/workshop/`.



## Deployment architecture



```

[Browser] ──HTTP:80──► EC2 (Nginx)

                         ├─ /        → React SPA (/opt/smarthome/dist)

                         ├─ /api/*   → Node.js :5000 (PM2)

                         └─ virtual-esp32 (PM2, MQTT)

                                    │

                          DynamoDB · Cognito · IoT Core · CloudWatch

```



| AWS service | Role |

|-------------|------|

| **EC2 + Nginx** | Host React frontend, proxy `/api` → Node.js backend |

| **DynamoDB** | Store sensor data, settings, logs, login history |

| **Cognito** | Production login, `admin` / `user` groups |

| **IoT Core** | MQTT backend ↔ virtual ESP32 / real ESP32 |

| **CloudWatch** | Audit log, app log, dashboard, login-fail alarm |



**Recommended region:** `ap-southeast-2` (Sydney).



## Table of contents



| Step | Topic |

|------|-------|

| [5.1 Introduction](5.1-introduction/) | Project overview, stack, deploy flow |

| [5.2 AWS prerequisites](5.2-prerequisites/) | Region, IAM, VPC, EC2 key pair |

| [5.3 AWS IoT Core](5.3-iot-core/) | Policy, Thing, Certificate, Endpoint |

| [5.4 CloudFormation](5.4-cloudformation/) | Deploy infrastructure stack (EC2, DynamoDB, Cognito, CloudWatch) |

| [5.5 Verify infrastructure](5.5-verify-infrastructure/) | Confirm resources in Console |

| [5.6 Deploy application](5.6-deploy-application/) | Configure `.env`, upload code to EC2, Nginx + PM2 |

| [5.7 Cognito users](5.7-cognito-users/) | Create demo users `admin`, `user1`, `user2` |

| [5.8 Verification & demo](5.8-verification-demo/) | Health check, login, device control |

| [5.9 Real ESP32 (optional)](5.9-optional-esp32/) | Flash firmware, use device cert |

| [5.10 Cleanup & troubleshooting](5.10-cleanup-troubleshooting/) | Delete stack, reset, troubleshooting table |



## Full deploy checklist



```

□ Select region ap-southeast-2

□ Create EC2 Key Pair → save .pem (do not commit to Git)

□ Verify default VPC + public subnet

□ IoT Core: Policy + 2 Things + cert → backend/certs/ + certs-device/

□ Get IoT endpoint

□ CloudFormation: deploy smarthome-stack → record Outputs

□ Edit infrastructure/ec2.env.template

□ deploy-all.ps1 or manual upload to EC2

□ curl http://EC2_IP/api/health → ok

□ Create Cognito demo users

□ Open http://EC2_IP → login admin / Admin@Demo2024

□ Test light/fan/door control

□ pm2 logs virtual-esp32 → MQTT connected

```


