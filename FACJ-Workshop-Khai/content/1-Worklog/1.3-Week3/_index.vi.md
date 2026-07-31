---
title: "Tuần 3 - Nhật ký công việc"
date: 2026-06-22
weight: 3
chapter: false
pre: " <b> 1.3. </b> "
---

### Mục tiêu tuần 3:

* Học cấu trúc IAM policy (Effect, Action, Resource, Condition).
* Viết custom policy cho **DynamoDB** — `GetItem`, `PutItem`, `Query`, `UpdateItem`.
* Viết custom policy cho **IoT publish** — `iot:Publish` trên device topic.
* Gắn policy vào IAM user backend; verify bằng CLI.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Học cú pháp JSON IAM policy và nguyên tắc least-privilege <br> - Liệt kê action `server.js` và Lambda cần trên DynamoDB | 22/06/2026 | 22/06/2026 | <https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html> |
| 2 | - Soạn `SmartHome-DynamoDB-Policy`: table ARN, truy cập index <br> - Gắn policy; chạy `aws dynamodb list-tables` | 23/06/2026 | 23/06/2026 | <https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/iam-policy-example.html> |
| 3 | - Soạn `SmartHome-IoT-Publish-Policy`: `iot:Publish` trên `smarthome/*/telemetry` <br> - Giới hạn resource trong account nhóm | 24/06/2026 | 24/06/2026 | <https://docs.aws.amazon.com/iot/latest/developerguide/iot-policies.html> |
| 4 | - Gắn cả hai policy vào IAM user backend <br> - Validate ghi DynamoDB bằng `aws dynamodb put-item` (bảng test) | 25/06/2026 | 25/06/2026 | AWS Console / CLI |
| 5 | - Ghi policy ARN vào wiki nhóm <br> - Thống nhất pattern IoT topic với bạn firmware | 26/06/2026 | 26/06/2026 | Repo SmartHome_IoT |

### Thành quả tuần 3:

* Custom IAM policy cho DynamoDB CRUD và IoT publish đã tạo.
* Policy gắn và verify qua CLI — không cấp quyền thừa.
* Pattern topic ARN thống nhất cho MQTT bridge các tuần sau.
* IAM user backend sẵn sàng cho VPC và EC2.
