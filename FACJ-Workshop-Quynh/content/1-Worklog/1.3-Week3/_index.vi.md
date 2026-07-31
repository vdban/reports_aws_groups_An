---
title: "Tuần 3 - Nhật ký công việc"
date: 2026-06-22
weight: 3
chapter: false
pre: " <b> 1.3. </b> "
---

### Mục tiêu tuần 3:

* Học **IAM** cơ bản: user, group, policy, least privilege.
* Nghiên cứu **Amazon Cognito** cho luồng đăng nhập/đăng ký trên dashboard.
* Phác thảo wireframe sơ bộ màn hình Login và trang chủ sau đăng nhập.
* Họp nhóm: thống nhất yêu cầu xác thực người dùng cho frontend.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Học IAM: user, group, policy JSON, managed vs inline policy <br> - Kiểm tra policy IAM user em đang dùng cho S3 lab | 22/06/2026 | 22/06/2026 | <https://docs.aws.amazon.com/iam/> |
| 2 | - Thực hành tạo IAM group `frontend-dev`; gắn policy S3 read-only cho preview bucket <br> - Ghi chú nguyên tắc **least privilege** khi deploy frontend | 23/06/2026 | 23/06/2026 | <https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html> |
| 3 | - Nghiên cứu **Cognito User Pool**: sign-up, sign-in, JWT token, hosted UI <br> - So sánh Cognito Hosted UI vs custom login form trong React | 24/06/2026 | 24/06/2026 | <https://docs.aws.amazon.com/cognito/> |
| 4 | - Phác thảo **wireframe Login**: email/password, nút đăng nhập, trạng thái lỗi thân thiện <br> - Ghi chú UX: loading spinner, thông báo sai mật khẩu rõ ràng, không lộ thông tin nhạy cảm | 25/06/2026 | 25/06/2026 | Figma / giấy |
| 5 | - Họp nhóm: trình bày phác thảo login UI và luồng Cognito <br> - Thống nhất dashboard chỉ hiển thị sau xác thực; em chuẩn bị moodboard màu sắc giao diện | 26/06/2026 | 26/06/2026 | Repo SmartHome_IoT |

### Thành quả tuần 3:

* Nắm **IAM** cơ bản và cách policy ảnh hưởng quyền truy cập S3 của frontend.
* Hiểu **Cognito User Pool** phù hợp cho màn hình đăng nhập SmartHome dashboard.
* Có wireframe sơ bộ màn Login với UX thân thiện, dễ hiểu cho người dùng.
* Nhóm thống nhất yêu cầu auth trước khi vào dashboard.
