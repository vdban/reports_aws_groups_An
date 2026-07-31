---
title: "Event 2"
date: 2026-07-11
weight: 2
chapter: false
pre: " <b> 4.2. </b> "
---

# Event Report: First Cloud AI Journey

## Purpose of the Event

The **First Cloud AI Journey** event was organized to provide practical knowledge about Cloud Computing, System Monitoring, AWS Certification, and Application Security. The program helped participants understand how modern cloud systems are operated on AWS, how to design effective monitoring strategies, prepare for AWS certifications, and leverage Artificial Intelligence to improve application security.

---

## Speakers

- **Nguyen Huynh Son** – Former Infrastructure Reliability Engineer at SPS
- **Ngo Le Tan Huy** – AWS Cloud Practitioner Speaker
- **Thinh Nguyen** – DevOps/DevSecOps/Cloud Engineer at Styl Solutions

---

## Key Highlights

### 1. SLA and System Monitoring

**Speaker:** Nguyen Huynh Son

The session explained the importance of monitoring in maintaining Service Level Agreements (SLAs) and ensuring service reliability.

Key takeaways:

- Monitoring is an essential part of the Risk Management lifecycle:
  - Identify
  - Monitor
  - Respond
  - Improve
- The Monitoring Pyramid consists of multiple layers:
  - Cloud Provider
  - Infrastructure
  - Application
  - Business
  - Customer Experience
- Healthy infrastructure metrics (CPU, Memory, Network) do not necessarily guarantee a good customer experience.
- Monitoring should focus on customer-facing metrics such as:
  - Login Success Rate
  - Payment Success Rate
  - API Availability
  - End-user Journey

---

### 2. AWS Cloud Practitioner Certification Strategy

**Speaker:** Ngo Le Tan Huy

This session introduced effective learning strategies for the AWS Certified Cloud Practitioner (CLF-C02) certification.

Main topics included:

- The exam consists of four domains:
  - Cloud Concepts (24%)
  - Security and Compliance (30%)
  - Cloud Technology and Services (34%)
  - Billing, Pricing and Support (12%)
- Overview of important AWS frameworks:
  - AWS Well-Architected Framework
  - AWS Cloud Adoption Framework
- Practical exam strategies:
  - Keyword Thinking
  - Elimination Method
  - Flag for Review
  - Identifying misleading keywords in exam questions

---

### 3. Application Security with AWS Security Agent

**Speaker:** Thinh Nguyen

This presentation demonstrated how AI Agents can automate application security throughout the software development lifecycle.

Key points:

- Traditional penetration testing is:
  - Time-consuming
  - Expensive
  - Highly dependent on security experts
- Frontier Agent running on Amazon Bedrock can:
  - Review design documents
  - Analyze Pull Requests
  - Scan source code
  - Perform automated security testing
- AI Agents operate using a Task-Hour pricing model.
- Current limitations include:
  - Unable to bypass MFA or biometric authentication
  - Difficulty detecting business logic vulnerabilities

---

## What I Learned

### Monitoring Mindset

The event changed my understanding of monitoring.

Instead of focusing only on infrastructure metrics, monitoring should prioritize what customers actually experience.

A fully green dashboard does not necessarily indicate a healthy user experience.

---

### Architecture and Security

One of the most valuable concepts was the **Shared Responsibility Model**.

AWS is responsible for **Security of the Cloud**, while customers are responsible for **Security in the Cloud**.

AI can also assist throughout the SDLC by supporting:

- Design Reviews
- Code Reviews
- Security Scanning
- Automated Code Fixes

---

### Learning Strategy

The speakers emphasized that:

- Hands-on practice using AWS Free Tier is more valuable than reading documentation alone.
- Every practice exam should be carefully reviewed to understand why incorrect answers were chosen.
- Certifications provide a solid foundation, but practical experience is the true differentiator.

---

## Applying the Knowledge

After attending the event, I plan to apply these lessons in several areas.

### Improving Monitoring

- Build additional Amazon CloudWatch Alarms.
- Monitor API Success Rates.
- Track business-oriented metrics instead of focusing only on CPU and memory utilization.

### Preparing for AWS Certifications

- Apply the Keyword Thinking strategy.
- Study each exam domain systematically.
- Analyze mistakes from practice exams.

### Improving CI/CD Security

- Integrate automated code security reviews into Pull Requests.
- Explore AI-powered security review tools.
- Adopt DevSecOps practices throughout the software development lifecycle.

---

## Event Experience

Attending the First Cloud AI Journey was an inspiring and valuable experience.

All speakers shared practical knowledge gained from operating real production systems, making the sessions highly relevant and realistic.

The most memorable topics included:

- Building an alerting workflow from Metrics → Alarms → SNS.
- Applying a Customer-first mindset to monitoring.
- Using Amazon Bedrock to automate security reviews.

The event also encouraged active discussions, allowing participants to interact directly with experienced cloud professionals.

---

## Lessons Learned

The event provided several important insights:

- AWS is responsible for the cloud infrastructure, but organizations remain responsible for delivering excellent customer experiences.
- Effective monitoring should prioritize business metrics rather than only infrastructure metrics.
- AWS certifications build foundational knowledge, while hands-on experience determines professional capability.
- AI cannot replace engineers entirely, but it can automate repetitive security tasks and significantly improve development efficiency when used appropriately.

---

## Photos from the Event

> *(Insert event photos here.)*

---

## Conclusion

First Cloud AI Journey provided valuable knowledge about AWS, monitoring strategies, cloud security, and AI-assisted software development. More importantly, it changed my perspective on modern system operations by emphasizing customer-centric monitoring, practical cloud engineering, and the integration of AI into DevSecOps practices.