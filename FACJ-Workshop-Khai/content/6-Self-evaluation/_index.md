---

title: "Self-evaluation"

date: 2026-07-01

weight: 6

chapter: false

pre: " <b> 6. </b> "

---



During the **8-week** **First Cloud AI Journey (FCAJ)** internship at AWS Vietnam (**08/06/2026 – 31/07/2026**), I joined a **5-person** team building **SmartHome_IoT** — a smart home platform with **ESP32 / Virtual ESP32**, **React dashboard**, **Node.js backend** on **EC2 (Nginx + PM2)**, **DynamoDB**, **Amazon Cognito**, **AWS IoT Core (MQTT)**, **CloudFormation**, and **CloudWatch**. My role was **Backend Node.js / Cloud**: API development, MQTT integration, DynamoDB storage design, and EC2 deploy support.



In parallel, I learned and operated AWS services: account & **Budgets**, **IAM** / **IAM Role for EC2**, **VPC**, **EC2**, **AWS CLI**, **CloudWatch Logs**, plus deploy workflows via scripts and the **AWS Management Console** (per the project workshop).



The internship helped me grasp the end-to-end flow: **Dashboard → Nginx → API → DynamoDB / Cognito**, plus **IoT Core ↔ backend ↔ devices**, and handle real incidents (CORS, MQTT certs, `pm2`, CloudFormation stack rollback).



| No. | Criterion | Description | Good | Fair | Average |

| --- | --------- | ----------- | ---- | ---- | ------- |

| 1 | **Professional knowledge & skills** | Node.js API, DynamoDB, IoT Core, EC2 deploy | ☐ | ✅ | ☐ |

| 2 | **Learning ability** | Absorb AWS and MQTT quickly in 8 weeks | ✅ | ☐ | ☐ |

| 3 | **Initiative** | Self-read README, debug API/health, try CLI | ☐ | ✅ | ☐ |

| 4 | **Responsibility** | Deliver API, integration, deploy on milestones | ☐ | ✅ | ☐ |

| 5 | **Discipline** | Follow rules, worklog, no committed secrets | ☐ | ✅ | ☐ |

| 6 | **Growth mindset** | Apply mentor/team feedback to code and config | ☐ | ✅ | ☐ |

| 7 | **Communication** | Explain backend flow, demo `/api/health` | ☐ | ☐ | ✅ |

| 8 | **Teamwork** | Coordinate with frontend (API contract), firmware (MQTT topics) | ☐ | ✅ | ☐ |

| 9 | **Professional behavior** | Respect mentors and teammates | ✅ | ☐ | ☐ |

| 10 | **Problem solving** | Fix MQTT, CORS, Nginx 502, Cognito login issues | ☐ | ✅ | ☐ |

| 11 | **Project contribution** | Backend + DynamoDB + MQTT bridge for SmartHome_IoT | ☐ | ✅ | ☐ |

| 12 | **Overall** | Overall internship assessment | ☐ | ✅ | ☐ |



### Specific contributions to SmartHome_IoT



- Analyzed and extended **`backend/server.js`**: REST API (`/api/login`, `/api/home`, device toggle), SSE realtime.

- Designed and implemented **DynamoDB** data layer (single-table `SmartHome`: sensor, settings, logs).

- Integrated **AWS IoT Core** — subscribe/publish MQTT, virtual-esp32 on EC2.

- Configured **Cognito** (IdToken), production `.env` (`ec2.env.template`), verified `/api/health`.

- Participated in **CloudFormation** stack deploy, EC2 SSH, **`pm2`** (`smarthome-backend`, `virtual-esp32`), Nginx `/api` proxy.



### Areas to improve



* **Presentation & demo:** explain the light/fan/door toggle flow more clearly to mentors and reviewers.

* **Early communication:** finalize API contract and MQTT topics with frontend / embedded team in weeks 3–4 to reduce rework.

* **Cloud & security:** go deeper into **VPC / Security Group**, **IoT policy**, and **IAM least privilege** checklist.

* **Operations:** gain more confidence reading **CloudWatch Logs** and handling production incidents (502, `mqtt: false`).

