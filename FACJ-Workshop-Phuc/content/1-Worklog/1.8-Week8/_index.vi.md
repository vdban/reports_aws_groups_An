---
title: "Tuần 8 - Nhật ký công việc"
date: 2026-07-27
weight: 8
chapter: false
pre: " <b> 1.8. </b> "
---

### Mục tiêu tuần 8:

* **Orchestration deploy** full stack AWS cho SmartHome_IoT (VPC → EC2 → S3/RDS → Lambda → Cognito).
* Publish Hugo workshop site qua **AWS Amplify** (branch `main`, build spec Hugo).
* **Cleanup unused resources**: stop EC2, snapshot RDS nếu cần, xóa NAT/test buckets.
* Final cost report + security checklist trước demo và nộp báo cáo thực tập.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - [ ] Viết deploy runbook thứ tự: infra verify → Lambda deploy → Cognito env → smoke test <br> - [ ] Chạy orchestration lần 1; ghi log lỗi lên Slack | 27/07/2026 | 27/07/2026 | Repo SmartHome_IoT / runbook |
| 2 | - [ ] Kết nối repo **FACJ-Workshop-quynh** với **Amplify Hosting** <br> - [ ] Cấu hình build Hugo (`hugo --minify`); deploy preview URL cho mentor | 28/07/2026 | 28/07/2026 | <https://docs.aws.amazon.com/amplify/> |
| 3 | - [ ] Fix deploy issues từ lần 1; chạy orchestration lần 2 (full smoke test) <br> - [ ] Confirm CloudWatch dashboards + Budgets alert vẫn active sau deploy | 29/07/2026 | 29/07/2026 | CloudWatch / Budgets |
| 4 | - [ ] **Cleanup checklist**: <br> &nbsp;&nbsp;- [ ] Stop EC2 lab instances <br> &nbsp;&nbsp;- [ ] RDS stop hoặc delete test instance (backup snapshot trước) <br> &nbsp;&nbsp;- [ ] Xóa elastic IP / NAT không dùng <br> &nbsp;&nbsp;- [ ] Review S3 lifecycle | 30/07/2026 | 30/07/2026 | Cost optimization guides |
| 5 | - [ ] Final **security + cost report** gửi mentor <br> - [ ] Demo SmartHome_IoT + Hugo site trên Amplify; hoàn tất worklog tuần 8 | 31/07/2026 | 31/07/2026 | Portal FCAJ |

### Thành quả tuần 8:

* [x] **Full AWS deploy orchestration** chạy thành công; smoke test pass.
* [x] Hugo workshop site live trên **Amplify**; URL share được với mentor.
* [x] **Unused resources** đã stop/xóa; chi phí tháng cuối trong ngưỡng Budgets.
* [x] Final security checklist và cost report hoàn tất.
* [x] Kỳ thực tập SmartHome_IoT — vai trò DevOps/AWS infra — deliverable đủ để **pass**.
