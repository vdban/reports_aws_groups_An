---
title: "Security configuration"
date: 2026-07-01
weight: 2
chapter: false
pre: " <b> 5.3.2. </b> "
---

# Security notes for SmartHome_IoT frontend & assets

- Keep Firebase/API keys out of public repos when possible; use env vars at build time carefully.
- Prefer private buckets + CloudFront for production; for lab, limit public access to only required objects.
- Browser calls should go to trusted backends only (HTTPS endpoints).
- CORS must allow your frontend origin if APIs are cross-origin.
- Use IAM least privilege for any CI/deploy user that uploads to S3.
