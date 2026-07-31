---
title: "Auth setup"
date: 2026-07-01
weight: 2
chapter: false
pre: " <b> 5.5.2. </b> "
---

# Amazon Cognito for SmartHome_IoT

### Steps (lab)
1. Create a **Cognito User Pool** (email sign-up or federated IdPs as needed).
2. Create an **App client** for the React dashboard.
3. Configure callback URLs to your S3 website / CloudFront domain.
4. Wire the frontend Amplify/Auth SDK (or equivalent) to the User Pool.
5. Never commit Cognito client secrets that must stay private.

Cognito is the AWS auth path used for the internship deploy (infrastructure on AWS).
