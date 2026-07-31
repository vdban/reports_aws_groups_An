---
title: "Blog 3"
date: 2026-07-01
weight: 3
chapter: false
pre: " <b> 3.3. </b> "
---

# OPTIMIZED MONITORING & DEBUGGING FOR AMAZON EMR ON EC2

Amazon EMR on EC2 has added several new improvements to simplify monitoring and incident handling for Big Data workloads. The new features focus on real-time log collection, improved application tracking, and faster troubleshooting for administrators.

## Key points to understand:

- Supports real-time log streaming from EMR Steps, Spark Driver, and Spark Executor to Amazon CloudWatch Logs.
- Allows customizing CloudWatch Log Groups, encrypting with AWS KMS, and analyzing logs via CloudWatch Logs Insights.
- Supports configuring dedicated Amazon S3 paths and separate KMS keys per EMR Step, improving authorization and security in multi-user environments.
- Direct access to YARN ResourceManager UI and Tez UI from the AWS Management Console without SSH Tunnel or Proxy.
- Displays YARN Application ID directly in the EMR Step details interface, making it easier to cross-reference with Spark History Server or container logs during error analysis.
- Extends custom metrics collection for Hadoop, YARN, and HBase via CloudWatch Agent with up to one-minute frequency.
- Allows updating metric configuration on running clusters without restart.
- Supports integration with monitoring systems such as Amazon CloudWatch, Prometheus, and Grafana to build custom dashboards.
- Using CloudWatch Logs and CloudWatch Metrics incurs additional costs based on log volume and metrics collected.

These improvements significantly simplify monitoring and debugging on Amazon EMR, especially for large data processing systems that need observability and fast incident response.


---

**…Link…**

- https://www.facebook.com/groups/awsstudygroupfcj/permalink/2225013128263647/

---

**…Guide…**

1. Create or use an Amazon EMR Cluster on EC2.
2. Enable CloudWatch Logs and CloudWatch Agent when configuring the cluster.
3. Run Spark or Hadoop Jobs on EMR.
4. Monitor logs in real time in CloudWatch Logs.
5. Access YARN ResourceManager UI directly from the AWS Console.
6. Check YARN Application ID to cross-reference with Spark History or container logs.
7. Configure additional custom metrics if monitoring Hadoop, YARN, or HBase is needed.
