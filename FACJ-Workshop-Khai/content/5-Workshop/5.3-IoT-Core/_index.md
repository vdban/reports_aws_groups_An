---

title: "5.3 AWS IoT Core"

date: 2026-07-01

weight: 3

chapter: false

pre: " <b> </b> "

---



# Configure AWS IoT Core (Console)



Backend and devices communicate via **MQTT** on **AWS IoT Core**. You need **1 Policy** and **2 Things** (Backend + Device), each with its own certificate.



Sample policy file in repo: `SmartHome_IoT-main/infrastructure/iot/iot-policy.json`.



---



## Step 1 — Create IoT Policy



1. Console → **IoT Core** → **Security** → **Policies** → **Create policy**.

2. **Policy name:** `SmartHomeDevicePolicy`

3. **Policy document:** paste content from `iot-policy.json`:



```json

{

  "Version": "2012-10-17",

  "Statement": [

    {

      "Effect": "Allow",

      "Action": ["iot:Connect"],

      "Resource": "arn:aws:iot:ap-southeast-2:*:client/*"

    },

    {

      "Effect": "Allow",

      "Action": ["iot:Publish", "iot:Receive"],

      "Resource": [

        "arn:aws:iot:ap-southeast-2:*:topic/device/*",

        "arn:aws:iot:ap-southeast-2:*:topicfilter/device/*"

      ]

    },

    {

      "Effect": "Allow",

      "Action": ["iot:Subscribe"],

      "Resource": "arn:aws:iot:ap-southeast-2:*:topicfilter/device/*"

    }

  ]

}

```



4. **Create**.



![Create IoT Policy SmartHomeDevicePolicy](/images/workshop/5.3-01-iot-policy-create.png)



![IoT Policy document saved](/images/workshop/5.3-02-iot-policy-saved.png)



---



## Step 2 — Create Thing `YoloHomeBackend` (backend EC2)



1. **IoT Core** → **Manage** → **All devices** → **Things** → **Create things**.

2. **Create single thing** → **Thing name:** `YoloHomeBackend`

3. **Auto-generate a new certificate** → **Active** certificate.

4. **Attach policies** → select `SmartHomeDevicePolicy`.

5. **Create thing** → **Download** 3 certificate files.



![Create Thing YoloHomeBackend](/images/workshop/5.3-03-thing-backend-create.png)





6. Rename 3 files and place in `SmartHome_IoT-main/backend/certs/`:



| Downloaded file | Rename to |

|-----------------|-----------|

| `*-private.pem.key` | `private.pem.key` |

| `*-certificate.pem.crt` | `device.pem.crt` |

| `AmazonRootCA1.pem` (or root CA) | `root-CA.crt` |



![backend/certs/ folder](/images/workshop/5.3-05-backend-certs-folder.png)



**MQTT Client ID:** `YoloHomeBackend` (matches Thing name).



---



## Step 3 — Create Thing `YoloUNODevice` (ESP32 / virtual device)



Repeat Step 2 with:



- **Thing name:** `YoloUNODevice`

- **Client ID:** `YoloUNODevice`

- Save cert to `SmartHome_IoT-main/backend/certs-device/`



![Create Thing YoloUNODevice](/images/workshop/5.3-06-thing-device-create.png)



![backend/certs-device/ folder](/images/workshop/5.3-07-device-certs-folder.png)



> Extract cert for ESP32 firmware: `cd backend && npm run extract-certs`



---



## Step 4 — Verify certificate & policy on Console



1. **Security** → **Certificates** → status **Active**.

2. Each certificate → **Policies** tab → has `SmartHomeDevicePolicy`.

3. **Things** → each Thing → **Certificates** tab → cert attached.



![Active certificate list](/images/workshop/5.3-08-certificates-active.png)



![Policy attached to certificate](/images/workshop/5.3-09-cert-policy-attached.png)



---



## Step 5 — Get IoT Data endpoint



1. **IoT Core** → **Settings** (left menu).

2. Copy **Device data endpoint** (format `xxxxx-ats.iot.ap-southeast-2.amazonaws.com`).



![IoT Data endpoint on Settings](/images/workshop/5.3-10-iot-endpoint.png)



**Or via CLI:**



```powershell

aws iot describe-endpoint --endpoint-type iot:Data-ATS --region ap-southeast-2 `

  --query endpointAddress --output text

```



Record endpoint — use in `infrastructure/ec2.env.template` (`IOT_ENDPOINT=...`).



---



## Step 5.3 checklist



| # | Item | Status |

|---|------|--------|

| 1 | Policy `SmartHomeDevicePolicy` | ☐ |

| 2 | Thing `YoloHomeBackend` + cert → `backend/certs/` | ☐ |

| 3 | Thing `YoloUNODevice` + cert → `backend/certs-device/` | ☐ |

| 4 | IoT endpoint recorded | ☐ |

