---

title: "5.9 Real ESP32 (Optional)"

date: 2026-07-01

weight: 9

chapter: false

pre: " <b>  </b> "

---



# Real ESP32 (optional)



Default demo uses **Virtual ESP32** on EC2 (PM2). If you have an ESP32 board, you can replace it to send real sensor data via MQTT.



---



## Step 1 — Stop Virtual ESP32 on EC2



Avoid duplicate **Client ID** `YoloUNODevice`:



```bash

ssh -i smarthome-key.pem ec2-user@EC2_PUBLIC_IP

pm2 stop virtual-esp32

pm2 save

```





**Console:** EC2 → Connect → run commands above or use **Systems Manager** → **Run command**.



---



## Step 2 — Prepare device cert



Cert for Thing **`YoloUNODevice`** was created in [5.3 IoT Core](5.3-iot-core/).



Extract cert for firmware:



```powershell

cd SmartHome_IoT-main\backend

npm run extract-certs

```



Output files used for `code/secrets.h`.





---



## Step 3 — Configure WiFi & MQTT in firmware



Edit `SmartHome_IoT-main/code/secrets.h` (or equivalent file):



- WiFi SSID / password

- IoT endpoint (`IOT_ENDPOINT`)

- Cert/key from `certs-device/`





---



## Step 4 — Flash firmware with Arduino IDE



1. Open `code/IoT_Lab_ESP32/IoT_Lab_ESP32.ino`.

2. Board: **ESP32 Dev Module**, matching COM port.

3. **Upload**.







---



## Step 5 — Verify on AWS Console



**IoT Core** → **MQTT test client**:



- **Subscribe** to topic `device/+/telemetry` (or project topic)

- See messages from ESP32





Web dashboard — **IoT** badge on **Light**, **Fan**, **Door** devices.





---



## Restart Virtual ESP32 (when not using board)



```bash

pm2 start virtual-esp32

pm2 save

```



