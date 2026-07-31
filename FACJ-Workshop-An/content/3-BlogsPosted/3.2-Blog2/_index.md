---
title: "Blog 2"
date: 2026-07-01
weight: 2
chapter: false
pre: " <b> 3.2. </b> "
---

# ENHANCED THROTTLING OBSERVABILITY IN AMAZON DYNAMODB

Amazon DynamoDB has introduced several improvements to its throttling observability capabilities. These enhancements help developers quickly identify why throttling occurs, determine which resources are affected, and troubleshoot performance issues more efficiently.

## Key takeaways:

- Throttling exceptions now provide more detailed information, including the specific reason for throttling and the affected resource (table or Global Secondary Index).
- New throttling reason codes include examples such as:
  - `TableWriteProvisionedThroughputExceeded`
  - `TableReadKeyRangeThroughputExceeded`
  - These reason codes make it easier to determine the appropriate mitigation strategy.
- Amazon CloudWatch now includes additional metrics categorized by throttling cause:
  - Provisioned Throughput exceeded.
  - Maximum On-Demand Throughput exceeded.
  - Account Throughput Limit reached.
  - Key Range Throughput exceeded (Hot Partition).
- CloudWatch Contributor Insights introduces a **Throttled Keys Only** mode, which records only the partition keys responsible for throttling instead of analyzing all application traffic.
- This new mode helps:
  - Identify hot keys and hot partitions more efficiently.
  - Reduce monitoring costs.
  - Enable Contributor Insights in production environments with lower overhead.
- AWS also updated exception handling for strongly typed SDKs (such as Java, .NET, and Go). Developers are encouraged to use `instanceof` (or equivalent type checking) instead of exact class comparisons to maintain compatibility with newer SDK versions.
- These enhancements significantly improve troubleshooting efficiency and simplify performance optimization for DynamoDB workloads.
