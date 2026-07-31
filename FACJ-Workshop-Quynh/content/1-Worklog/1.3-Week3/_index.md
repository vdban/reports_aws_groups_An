---
title: "Week 3 - Worklog"
date: 2026-06-22
weight: 3
chapter: false
pre: " <b> 1.3. </b> "
---

### Week 3 goals:

* Learn **IAM** basics: users, groups, policies, least privilege.
* Research **Amazon Cognito** for dashboard sign-in and sign-up flows.
* Draft early wireframes for the Login screen and post-login home page.
* Team meeting: align on user authentication requirements for the frontend.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Study IAM: users, groups, policy JSON, managed vs inline policies <br> - Review the IAM policy on my lab user for S3 access | 22/06/2026 | 22/06/2026 | <https://docs.aws.amazon.com/iam/> |
| 2 | - Practice creating IAM group `frontend-dev`; attach S3 read-only policy for preview bucket <br> - Note **least privilege** principles for frontend deployment | 23/06/2026 | 23/06/2026 | <https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html> |
| 3 | - Research **Cognito User Pool**: sign-up, sign-in, JWT tokens, hosted UI <br> - Compare Cognito Hosted UI vs custom login form in React | 24/06/2026 | 24/06/2026 | <https://docs.aws.amazon.com/cognito/> |
| 4 | - Sketch **Login wireframe**: email/password fields, sign-in button, friendly error states <br> - UX notes: loading spinner, clear wrong-password message, no sensitive data exposure | 25/06/2026 | 25/06/2026 | Figma / paper |
| 5 | - Team meeting: present login UI sketch and Cognito flow <br> - Agree dashboard is visible only after auth; prepare UI color moodboard | 26/06/2026 | 26/06/2026 | SmartHome_IoT repo |

### Week 3 outcomes:

* Solid grasp of **IAM** basics and how policies affect frontend S3 access.
* Understanding of **Cognito User Pool** for the SmartHome dashboard login experience.
* Early Login wireframe with user-friendly, clear UX patterns.
* Team aligned on authentication before accessing the dashboard.
