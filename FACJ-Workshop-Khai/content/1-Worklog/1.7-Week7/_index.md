---
title: "Week 7 - Worklog"
date: 2026-07-20
weight: 7
chapter: false
pre: " <b> 1.7. </b> "
---

### Week 7 goals:

* Deploy **Lambda** handlers mirroring key `server.js` routes.
* Configure **API Gateway REST** — `/sensors`, `/devices`, `/commands` with Lambda proxy integration.
* Implement **MQTT bridge** — IoT Core → Lambda → DynamoDB write path.
* Build Postman collection; run full API test suite.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Package Lambda functions: `getSensors`, `postSensor`, `updateDevice` <br> - Reuse `dynamoRepository.js` layer | 20/07/2026 | 20/07/2026 | <https://docs.aws.amazon.com/lambda/> |
| 2 | - Create REST API in API Gateway; map methods to Lambda ARNs <br> - Enable CORS; deploy stage `dev` | 21/07/2026 | 21/07/2026 | <https://docs.aws.amazon.com/apigateway/latest/developerguide/setup-lambda-proxy.html> |
| 3 | - Wire IoT Rule: topic `smarthome/+/telemetry` → Lambda `mqttIngest` <br> - Parse JSON payload; call `putSensorReading` | 22/07/2026 | 22/07/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/iot-rules.html> |
| 4 | - Build Postman collection with env vars (`API_BASE`, `DEVICE_ID`) <br> - Test GET/POST flows; compare EC2 vs API Gateway responses | 23/07/2026 | 23/07/2026 | Postman |
| 5 | - Team integration test: ESP32 publish → IoT → Lambda → DynamoDB → `GET /api/sensors` <br> - Log failures in CloudWatch; fix timeout on cold start | 24/07/2026 | 24/07/2026 | SmartHome_IoT repo |

### Week 7 outcomes:

* Lambda + API Gateway REST endpoints live and callable.
* MQTT bridge ingests telemetry into DynamoDB — end-to-end path verified.
* Postman collection covers main API scenarios with passing tests.
* Bug list prepared for EC2 production deploy in week 8.
