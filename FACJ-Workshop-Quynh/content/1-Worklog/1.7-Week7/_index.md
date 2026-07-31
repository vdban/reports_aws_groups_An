---
title: "Week 7 - Worklog"
date: 2026-07-20
weight: 7
chapter: false
pre: " <b> 1.7. </b> "
---

### Week 7 goals:

* Implement the dashboard with **React + Vite** following the Figma design.
* Connect to the **backend API** (GET sensors, POST control) with loading and error states.
* Build the **Cognito login flow** on the frontend (sign-in, token, protected routes).
* Team meeting: demo end-to-end integration and collect UX feedback.

### Work done this week:
| Day | Tasks | Start | End | References |
| --- | ----- | ----- | --- | ---------- |
| 1 | - Initialize **React/Vite** project; folder structure `components/`, `pages/`, `services/` <br> - Implement main layout: header, sidebar, content area per Figma | 20/07/2026 | 20/07/2026 | Vite / React docs |
| 2 | - Code **SensorCard** component: temperature, humidity, door status; auto-refresh every 5 seconds <br> - Add skeleton loading while waiting for API to avoid blank screen frustration | 21/07/2026 | 21/07/2026 | SmartHome_IoT repo |
| 3 | - Connect `GET /sensors` via fetch/axios; map JSON → SensorCard props <br> - Implement **ControlPanel**: light/fan toggles call `POST /devices/control`; success/error toasts | 22/07/2026 | 22/07/2026 | Team API contract |
| 4 | - Integrate **Cognito login flow**: sign-in form, JWT storage, post-auth redirect <br> - Protected routes: unauthenticated users go to `/login`; friendly message on session expiry | 23/07/2026 | 23/07/2026 | <https://docs.aws.amazon.com/cognito/> |
| 5 | - Add **Pomodoro widget** and **door alert banner** (shown when `door_status === open`) <br> - Team meeting: end-to-end demo; fix minor UX (mobile font size, alert colors) from feedback | 24/07/2026 | 24/07/2026 | SmartHome_IoT repo |

### Week 7 outcomes:

* **React/Vite** dashboard running locally, closely matching Figma design.
* **Backend API** connected with smooth loading and error states.
* **Cognito login flow** working; routes protected after authentication.
* End-to-end demo reviewed by the team; ready for deployment in week 8.
