---

title: "Sharing and Feedback"

date: 2026-07-01

weight: 7

chapter: false

pre: " <b> 7. </b> "

---



> Personal sharing after **8 weeks** in **First Cloud AI Journey (FCAJ)**, deploying **Smart Home IoT Platform (SmartHome_IoT)** on AWS with my team.



### Overall assessment



**1. Learning & working environment**



FCAJ combined office onboarding, weekly AWS learning, and a **real project** — not isolated labs only. I found it valuable to shift from learning **IAM, VPC, EC2, CLI** (weeks 2–5) to **building & deploying SmartHome_IoT** (weeks 6–8): React dashboard, Node.js backend on **EC2 + Nginx**, **DynamoDB**, **Cognito**, **IoT Core**, **CloudFormation** stack, and **Hugo report on Amplify**.







**2. Fit with personal goals**



Before the internship, I was familiar with web backend but had limited **AWS production** experience. After 8 weeks, I went through the full loop: **IoT Core → MQTT → API → DynamoDB → Dashboard**, deploy via **CloudFormation + scripts**, demo at `http://EC2_IP` with **Cognito** login and device control (lights, fan, door). My goal of "learning cloud through an IoT project" was clearly met.



**3. Skills development opportunities**



The project required thinking across layers:



```

ESP32 / Virtual ESP32 ──MQTT──► IoT Core ──► Backend EC2 ──► DynamoDB

                                      ▲              │

User (Browser) ──► Nginx (React + /api) ──► Cognito / CloudWatch

```



I also practiced API design, **Infrastructure as Code**, bilingual **workshop / report** writing, and team coordination (frontend, embedded, DevOps).





### Other questions







### Additional feedback (optional)



I hope the program continues **end-to-end team projects** rather than only individual labs — that is where I learned the most. The **Hugo workshop + Amplify** section should also be kept so interns can practice presenting technical work to non-specialists.



### References



For repo details, demo links, and AWS service list: [References](../8-references/).

