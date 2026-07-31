---
title: "Blog 2"
date: 2026-07-01
weight: 2
chapter: false
pre: " <b> 3.2. </b> "
---

# ENHANCED THROTTLING OBSERVABILITY IN AMAZON DYNAMODB

Amazon DynamoDB has added several observability improvements for throttling events. The new updates help users quickly identify throughput limit causes, shorten incident response time, and optimize system performance.

## Key points to understand:

- Throttling exceptions are expanded, providing detailed information about the cause and affected resource (Table or Global Secondary Index — GSI).
- New reason codes such as:
  - `TableWriteProvisionedThroughputExceeded`
  - `TableReadKeyRangeThroughputExceeded`
  - Help quickly identify the type of throttling occurring.
- CloudWatch Metrics add many new indicators, categorized by cause:
  - Provisioned Throughput exceeded.
  - Max On-Demand Throughput reached configured threshold.
  - Account Throughput Limit.
  - Key Range Throughput (Hot Partition).
- CloudWatch Contributor Insights supports **Throttled Keys Only** mode, recording only partition keys that actually cause throttling instead of all access traffic.
- The new mode helps:
  - Easily detect hot keys and hot partitions.
  - Reduce monitoring costs compared to analyzing all traffic.
  - Suitable for use in production environments.
- AWS also updated exception handling in some strongly typed SDKs (Java, .NET, Go), recommending type checks with `instanceof` instead of exact exception class comparison to ensure compatibility with newer SDK versions.
- These improvements make identifying throttling causes and optimizing DynamoDB table design faster and more effective.

The new features are especially useful for high-traffic systems where throttling frequently occurs due to uneven data distribution or throughput limits.

---

---

**…Link…**

- https://www.facebook.com/groups/awsstudygroupfcj/permalink/2224286645002962/

---

**…Guide…**

1. Monitor exceptions when the application accesses DynamoDB.
2. Identify throttling cause through the **Reason** field in the exception.
3. Check new CloudWatch Metrics to determine which limit type is encountered.
4. Enable CloudWatch Contributor Insights with **Throttled Keys Only** mode to identify hot partitions.
5. Optimize capacity, partition key design, or request a Service Quota increase if needed.
