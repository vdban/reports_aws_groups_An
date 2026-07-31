---

title: "5.10 Cleanup & Troubleshooting"

date: 2026-07-01

weight: 10

chapter: false

pre: " <b> </b> "

---



# Cleanup, reset & Troubleshooting



---



## Clean up AWS resources (Console)



> **Warning:** Deleting the stack removes EC2, DynamoDB, Cognito, CloudWatch — **cannot be recovered**.



### Delete CloudFormation stack



1. **CloudFormation** → select **`smarthome-stack`** → **Delete**.

2. Wait for status **`DELETE_COMPLETE`**.



![Delete stack smarthome-stack](/images/workshop/5.10-01-delete-stack.png)



### Delete IoT Core (manual)



Stack does not delete IoT Things/Certs — do manually if needed:



1. **IoT Core** → **Things** → detach cert → delete thing.

2. **Certificates** → deactivate → delete.

3. **Policies** → delete `SmartHomeDevicePolicy`.



![Delete IoT Thing and certificate](/images/workshop/5.10-02-delete-iot-resources.png)

![Delete IoT policies](/images/workshop/5.10-04-delete-iot-polycies.png)

### Delete EC2 Key Pair (optional)



**EC2** → **Key pairs** → delete `smarthome-key` (only when no instance uses the key).



![Delete key pair](/images/workshop/5.10-03-delete-key-pair.png)



---



## Reset & redeploy



| Scenario | Action |

|----------|--------|

| UI changes | `deploy-all.ps1 -SkipBackend` |

| API changes | `deploy-all.ps1 -SkipFrontend` |

| EC2 IP changed | Edit `ec2.env.template` + redeploy frontend |

| Production login fail | Seed Cognito / reset password in Console |

| Stack ROLLBACK | Delete stack → fix key/VPC → redeploy |

| Reset Cognito password | `init-cognito-admin.ps1` or Console Set password |





---



## Troubleshooting table



| Symptom | Cause | Fix |

|---------|-------|-----|

| Stack **ROLLBACK_COMPLETE** | Wrong key pair, Subnet/VPC error | Check CFN Events, delete stack, redeploy |

| SSH **bad permissions** (.pem) | Windows key file permissions | `icacls` as in step 5.2 |

| **502 Bad Gateway** | Backend PM2 not running | `pm2 restart smarthome-backend` |

| **Blank page** | Empty `dist/` or wrong build URL | Redeploy frontend with correct `VITE_API_URL` |

| **CORS error** | Wrong `CORS_ORIGIN` | Match `http://EC2_IP` in `.env` |

| `mqtt: false` in health | Missing/wrong IoT cert | Check `backend/certs/` on EC2 |

| **virtual-esp32 errored** | Duplicate Client ID or device cert | `pm2 logs virtual-esp32`, stop real ESP32 |

| Cognito login fail | Password not set / wrong policy | Console → Users → Set password |

| DynamoDB empty | Backend not writing / MQTT not connected | Check PM2 + IoT endpoint |







---



## Estimated demo cost



| Service | ~$/month |

|---------|----------|

| EC2 t3.micro | $0 (free tier 12 months) |

| DynamoDB | $0–1 |

| Cognito | $0 (MAU free tier) |

| IoT Core | $0 (250K msg free) |

| CloudWatch | $0–1 |

| **Total** | **~$1–4** |



![AWS Cost Explorer after demo](/images/workshop/5.10-06-cost-explorer.png)



---



## References



- Project README: `SmartHome_IoT-main/README.md`

- CloudFormation: `infrastructure/cloudformation/smarthome-stack.yaml`

- IoT policy: `infrastructure/iot/iot-policy.json`

- Nginx: `infrastructure/nginx/smarthome.conf`

