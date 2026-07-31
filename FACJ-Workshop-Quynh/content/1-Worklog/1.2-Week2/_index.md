---
title: "Week 2 - Worklog"
date: 2026-06-15
weight: 2
chapter: false
pre: " <b> 1.2. </b> "
---

### Week 2 goals:

* Get familiar with the team's **shared AWS account** and basic security rules.
* Set up **AWS Budgets** to monitor lab costs.
* Preview **S3 static website hosting** for a pre-built React app.
* Team meeting: align on dashboard user flows and frontend deployment direction.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Sign in to the team's **shared AWS account**; read rules (no daily Root use, enable MFA) <br> - Create a personal IAM lab user with S3 read/write access | 15/06/2026 | 15/06/2026 | <https://docs.aws.amazon.com/accounts/> |
| 2 | - Study Free Tier and billing model <br> - Review the team's **AWS Budget** and note alert thresholds | 16/06/2026 | 16/06/2026 | <https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html> |
| 3 | - Build a sample React project (`npm run build`); upload the `dist/` folder to an S3 lab bucket <br> - Enable **Static website hosting**; configure index and error documents | 17/06/2026 | 17/06/2026 | <https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html> |
| 4 | - Test the demo page on the S3 endpoint; note SPA routing issues (404 on refresh) <br> - Compare S3 hosting vs Amplify Hosting for React | 18/06/2026 | 18/06/2026 | <https://docs.aws.amazon.com/amplify/> |
| 5 | - Team meeting: present S3 hosting preview; agree dashboard shows temperature, humidity, door sensors <br> - Sketch user flow: open app → view status → control devices | 19/06/2026 | 19/06/2026 | SmartHome_IoT repo |

### Week 2 outcomes:

* Access to the **shared AWS account** with a dedicated lab IAM user.
* Understanding of how **AWS Budgets** helps the team control costs.
* Successfully deployed a React demo build to **S3 static hosting**; aware of SPA routing limitations.
* Team aligned on basic dashboard user experience for SmartHome_IoT.
