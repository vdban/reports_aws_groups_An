---
title: "Blog 1"
date: 2026-07-01
weight: 1
chapter: false
pre: " <b> 3.1. </b> "
---

# AWS AMPLIFY HOSTING WITH AWS WAF FOR WEB DEMO DEPLOYMENT

AWS Amplify Hosting is a service that helps deploy static websites and modern frontend applications quickly. Recently, AWS added direct AWS WAF integration to Amplify Hosting, allowing users to strengthen website security without configuring CloudFront or other complex infrastructure components.

## Key points to understand:

- AWS Amplify Hosting supports deploying a website in minutes by connecting to GitHub, GitLab, or Bitbucket, or by uploading a build folder directly to the Amplify Console.
- Built-in CI/CD automatically builds and deploys whenever there are changes in the repository.
- Provides a default domain and SSL/TLS certificate (HTTPS), so the website is accessible immediately after deployment.
- Supports popular frontend frameworks such as React, Vue, Angular, Next.js, Nuxt, and static websites (HTML/CSS/JavaScript).
- AWS WAF is integrated directly in the Amplify Console, enabling security configuration in the management interface without separate CloudFront or additional services.
- Web ACLs can be applied to:
  - Block or allow access by IP address.
  - Restrict access by geographic region (Geo Match).
  - Apply AWS Managed Rules to protect against common web vulnerabilities (OWASP Top 10), malicious bots, and high-risk IP sources.
- Suitable for Workshop, Demo, Proof of Concept (PoC), or MVP projects that need fast deployment while ensuring basic protection layers.
- Note that both AWS Amplify Hosting and AWS WAF incur usage-based costs, so monitor Billing to avoid unexpected charges.

Direct AWS WAF integration in Amplify Hosting significantly shortens infrastructure deployment time while adding protection mechanisms that previously appeared mainly in production systems.

---



---

**…Link…**
https://www.facebook.com/groups/awsstudygroupfcj/permalink/2222716225160004/

---

**…Guide…**

1. Prepare website source code and push to GitHub/GitLab/Bitbucket (or build a static folder in advance).
2. Open the AWS Amplify Console and create a new Hosting application.
3. Connect the repository or upload the build folder directly to Amplify.
4. Wait for Amplify to automatically build and deploy the website.
5. After the website is running, open **Hosting → Firewall** to link or create a new AWS WAF Web ACL.
6. Configure Managed Rules or IP/Geo Match rules as needed.
7. Test the website via the HTTPS URL provided by Amplify and confirm security rules work as expected.
