---

title: "5.1 Introduction"

date: 2026-07-01

weight: 1

chapter: false

pre: " <b>  </b> "

---





## What is SmartHome_IoT?



**SmartHome_IoT** is a smart home management system including:



- **Frontend:** React + Vite (monitoring dashboard, device control)

- **Backend:** Node.js (`backend/server.js`) — REST API, SSE real-time, MQTT bridge

- **Devices:** Real ESP32 or **Virtual ESP32** (runs on EC2 via PM2) — demo without hardware

- **Cloud:** DynamoDB, Cognito, IoT Core, CloudWatch on AWS



Reference repo: `SmartHome_IoT-main/` in workspace.



![SmartHome_IoT architecture overview](/images/workshop/Diagram.png)



## Two run modes



| Mode | Auth | Database | Devices |

|------|------|----------|---------|

| **Local dev** | JWT (`admin/admin123`) | File `backend/data/local-db.json` | HTTP simulator |

| **Production EC2** | Cognito IdToken | DynamoDB | Virtual ESP32 (MQTT) or ESP32 |



This workshop focuses on **Production EC2** — deploy via AWS Console + deploy scripts.



## AWS stack (production)



| Layer | Technology | Role |

|-------|------------|------|

| Compute | **EC2** t3.micro + **Nginx** | Host UI + API proxy |

| Database | **DynamoDB** (`SmartHome`) | Single-table: sensor, settings, logs |

| Auth | **Cognito User Pool** | `admin` / `user` groups |

| Messaging | **IoT Core** (MQTT) | Backend ↔ devices |

| Monitoring | **CloudWatch** Logs + Dashboard + Alarm | Audit, app log, login fail |



## Overall deploy flow



```

① Prepare AWS (region, key pair, VPC)

② Configure IoT Core (Policy + 2 Things + cert)

③ Deploy CloudFormation → EC2, DynamoDB, Cognito, CloudWatch

④ Record Outputs (EC2 IP, Cognito Pool/Client ID, IoT endpoint)

⑤ Edit ec2.env.template → deploy code to EC2

⑥ Create Cognito demo users

⑦ Verify http://EC2_IP and device control

```





## Requirements before starting



- AWS account (Free Tier sufficient for demo)

- **Node.js 18+** on local machine (build frontend)

- **AWS CLI v2** (optional — deploy scripts use CLI)

- Source code `SmartHome_IoT-main/` cloned locally



