---
title: "Blog 1"
date: 2026-07-01
weight: 1
chapter: false
pre: " <b> 3.1. </b> "
---

# AWS AMPLIFY HOSTING WITH AWS WAF FOR WEB APPLICATION DEPLOYMENT

AWS Amplify Hosting is a managed hosting service that simplifies the deployment of static websites and modern frontend applications. AWS has recently introduced native AWS WAF integration for Amplify Hosting, allowing developers to enhance application security without manually configuring CloudFront distributions or other networking components.

## Key takeaways:

- Deploy web applications within minutes by connecting a GitHub, GitLab, or Bitbucket repository, or by uploading a pre-built application directly to the Amplify Console.
- Built-in CI/CD automatically builds and deploys the application whenever new code is pushed to the connected repository.
- Provides a default HTTPS domain with an SSL/TLS certificate immediately after deployment.
- Supports popular frontend frameworks such as React, Vue, Angular, Next.js, Nuxt, and static HTML/CSS/JavaScript websites.
- AWS WAF can now be configured directly from the Amplify Console without requiring additional CloudFront configuration.
- Web ACLs can be applied to:
  - Allow or block requests from specific IP addresses.
  - Restrict access based on geographic locations.
  - Enable AWS Managed Rules to protect against common web vulnerabilities (such as the OWASP Top 10), malicious bots, and known threat sources.
- Helps reduce infrastructure complexity by eliminating many manual networking and security configuration steps.
- Particularly suitable for workshop demonstrations, proof-of-concept (PoC) applications, academic projects, and minimum viable products (MVPs).
- Keep in mind that both AWS Amplify Hosting and AWS WAF are billed based on usage, so monitoring AWS Billing is recommended to avoid unexpected charges.

The integration of AWS WAF into Amplify Hosting allows developers to deploy secure web applications more efficiently while minimizing infrastructure management overhead.

---

## …Images…

- AWS Amplify application deployment interface.
- AWS WAF configuration page within the Amplify Console.
- CI/CD workflow from GitHub to AWS Amplify Hosting.

---

## …References…

- AWS News Blog – Firewall Support for AWS Amplify Hosted Sites
- AWS Mobile Blog – AWS Amplify Hosting Adds Web Application Firewall Protection (Public Preview)

---

## …Implementation Guide…

1. Prepare your web application and push the source code to GitHub, GitLab, or Bitbucket (or generate a production build).
2. Create a new hosting application in the AWS Amplify Console.
3. Connect your source code repository or upload the build artifacts directly.
4. Allow Amplify to automatically build and deploy the application.
5. After deployment, navigate to **Hosting → Firewall** in the Amplify Console.
6. Create or associate an AWS WAF Web ACL with the hosted application.
7. Configure AWS Managed Rules or custom IP/Geo Match rules according to your security requirements.
8. Verify that the application is accessible via the HTTPS URL provided by Amplify and confirm that the configured WAF rules are functioning as expected.