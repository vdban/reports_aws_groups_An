---
title: "Tuần 7 - Nhật ký công việc"
date: 2026-07-20
weight: 7
chapter: false
pre: " <b> 1.7. </b> "
---

### Mục tiêu tuần 7:

* Triển khai **Cognito User Pool** + app client cho auth SmartHome_IoT.
* Hỗ trợ team **deploy Lambda** (IAM role, env vars, CloudWatch log group).
* Chạy **security review** toàn stack: IAM, SG, S3 public block, Cognito password policy.
* Verify CloudWatch logs/alerts khi Lambda error rate tăng.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - [ ] Tạo Cognito User Pool: email sign-in, password policy mạnh, MFA optional <br> - [ ] Tạo app client (no secret cho SPA); cấu hình callback URL lab | 20/07/2026 | 20/07/2026 | <https://docs.aws.amazon.com/cognito/> |
| 2 | - [ ] IAM role `lab-lambda-role`: logs + DynamoDB/S3 tối thiểu <br> - [ ] Hỗ trợ backend deploy Lambda qua CLI/Console; tạo log group `/aws/lambda/smarthome-*` | 21/07/2026 | 21/07/2026 | Lambda + IAM docs |
| 3 | - [ ] Test flow đăng ký/đăng nhập Cognito với frontend <br> - [ ] Document env vars (User Pool ID, Client ID) cho team — không hardcode secret | 22/07/2026 | 22/07/2026 | Cognito + Amplify auth guides |
| 4 | - [ ] **Security review checklist**: <br> &nbsp;&nbsp;- [ ] IAM least privilege re-scan <br> &nbsp;&nbsp;- [ ] S3 public access blocked <br> &nbsp;&nbsp;- [ ] RDS không public <br> &nbsp;&nbsp;- [ ] Cognito token expiry hợp lý | 23/07/2026 | 23/07/2026 | AWS Security Hub / checklist nội bộ |
| 5 | - [ ] CloudWatch alarm Lambda Errors > 0 trong 5 phút <br> - [ ] Họp nhóm: auth + Lambda sẵn sàng cho deploy orchestration tuần 8 | 24/07/2026 | 24/07/2026 | Repo SmartHome_IoT |

### Thành quả tuần 7:

* [x] **Cognito User Pool** và app client hoạt động; frontend login được.
* [x] Lambda deploy support xong; log groups và IAM role chuẩn.
* [x] **Security review** pass checklist; không có public RDS/S3.
* [x] CloudWatch alarm bắt Lambda errors.
* [x] Stack auth + compute sẵn sàng orchestration full deploy tuần 8.
