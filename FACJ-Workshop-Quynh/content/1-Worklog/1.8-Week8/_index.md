---
title: "Week 8 - Worklog"
date: 2026-07-27
weight: 8
chapter: false
pre: " <b> 1.8. </b> "
---

### Week 8 goals:

* **Deploy the frontend** to S3 static hosting or **AWS Amplify**.
* Polish UI: spacing, animations, mobile responsiveness, basic accessibility.
* Capture high-quality **demo screenshots** for the workshop report and presentation slides.
* Team meeting: final demo and complete frontend documentation.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Production build (`npm run build`); check bundle size and env variables (API URL, Cognito pool ID) <br> - Deploy to **S3** production bucket; configure bucket policy and CORS | 27/07/2026 | 27/07/2026 | <https://docs.aws.amazon.com/s3/> |
| 2 | - Try deployment via **Amplify Hosting**; compare auto CI/CD vs manual S3 upload <br> - Choose final approach; configure custom error document for SPA routing | 28/07/2026 | 28/07/2026 | <https://docs.aws.amazon.com/amplify/> |
| 3 | - **UI polish**: adjust card spacing, smooth toggle transitions, optimize mobile fonts <br> - Verify door alert banner color and position across all breakpoints | 29/07/2026 | 29/07/2026 | Figma / Chrome DevTools |
| 4 | - Capture **demo screenshots**: login page, full sensor dashboard, open-door alert, control panel <br> - Write captions for each image for the workshop report | 30/07/2026 | 30/07/2026 | Snipping Tool / Figma |
| 5 | - Team meeting: **final demo** of SmartHome dashboard live on cloud <br> - Update frontend README (setup, deploy, env); submit worklog and demo images for the report | 31/07/2026 | 31/07/2026 | SmartHome_IoT repo |

### Week 8 outcomes:

* Frontend **successfully deployed** to S3/Amplify; accessible via public URL.
* **UI polished** — smooth experience, responsive layout, consistent visual design.
* Complete **demo screenshot** set for the report and presentation slides.
* Final demo completed; confident presenting the SmartHome_IoT frontend work.
