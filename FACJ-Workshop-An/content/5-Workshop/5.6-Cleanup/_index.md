---
title: "Cleanup"
date: 2026-07-01
weight: 6
chapter: false
pre: " <b> 5.6. </b> "
---

# Cleanup lab resources

To avoid unexpected AWS charges after demos:

1. Stop or terminate **EC2** instances
2. Delete unused **RDS** instances/snapshots (if created for lab)
3. Empty/delete temporary **S3** buckets if no longer needed
4. Delete unused **CloudWatch** alarms / log groups
5. Review **AWS Budgets** and Billing dashboard
6. Rotate any leaked keys; remove lab Access Keys if IAM roles are enough

Keep a short team checklist in your worklog after every demo day.
