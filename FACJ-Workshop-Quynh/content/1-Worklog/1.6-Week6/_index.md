---
title: "Week 6 - Worklog"
date: 2026-07-13
weight: 6
chapter: false
pre: " <b> 1.6. </b> "
---

### Week 6 goals:

* Deep dive into **S3**: bucket policies, CORS, versioning for production frontend deployment.
* Complete **Figma UI** design: sensor cards, control panel, Pomodoro timer, door alerts.
* Build a basic design system (colors, typography, spacing, component states).
* Team meeting: review Figma and align on handoff to React in week 7.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Advanced S3: bucket policy, public access block, **CORS** for frontend API calls <br> - Configure CORS rule on lab bucket; test preflight request | 13/07/2026 | 13/07/2026 | <https://docs.aws.amazon.com/s3/> |
| 2 | - Study S3 versioning and lifecycle; note frontend build backup strategy <br> - Create Figma file SmartHome Dashboard; set color palette (soft blue, alert red) | 14/07/2026 | 14/07/2026 | Figma |
| 3 | - Design **sensor cards**: temperature, humidity, light — intuitive icons, large metrics, online/offline status <br> - Add hover/active states for smooth interactive feel | 15/07/2026 | 15/07/2026 | Figma |
| 4 | - Design **control panel**: light/fan toggles, brightness slider; **Pomodoro widget** in top-right corner <br> - Design **door alert banner**: bold red, open-door icon, subtle animation to draw attention | 16/07/2026 | 16/07/2026 | Figma |
| 5 | - Finish responsive frames (desktop + mobile); export component specs <br> - Team meeting: Figma demo; UX feedback; confirm design handoff for React/Vite week 7 | 17/07/2026 | 17/07/2026 | Figma / SmartHome_IoT repo |

### Week 6 outcomes:

* **S3 deep dive** (policy, CORS) — ready for secure frontend deployment.
* Complete **Figma UI**: sensor cards, control panel, Pomodoro, door alerts with consistent visual design.
* Basic design system (colors, fonts, spacing) keeps React code aligned with design.
* Figma approved by the team; ready for React implementation in week 7.
