---
title: "Tuần 2 - Nhật ký công việc"
date: 2026-06-15
weight: 2
chapter: false
pre: " <b> 1.2. </b> "
---

### Mục tiêu tuần 2:

* Làm quen **tài khoản AWS dùng chung** của nhóm và quy tắc bảo mật cơ bản.
* Thiết lập **AWS Budgets** để theo dõi chi phí lab.
* Thử nghiệm **S3 static website hosting** cho ứng dụng React build sẵn.
* Họp nhóm: thống nhất luồng người dùng dashboard và hướng deploy frontend.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Đăng nhập **tài khoản AWS dùng chung** nhóm; đọc quy tắc không dùng Root, bật MFA <br> - Tạo IAM user riêng cho em với quyền S3 read/write lab | 15/06/2026 | 15/06/2026 | <https://docs.aws.amazon.com/accounts/> |
| 2 | - Tìm hiểu Free Tier và mô hình billing <br> - Kiểm tra **AWS Budget** nhóm đã tạo; ghi chú ngưỡng cảnh báo chi phí | 16/06/2026 | 16/06/2026 | <https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html> |
| 3 | - Build thử project React (`npm run build`); upload thư mục `dist/` lên bucket S3 lab <br> - Bật **Static website hosting**; cấu hình index document và error document | 17/06/2026 | 17/06/2026 | <https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html> |
| 4 | - Kiểm tra trang demo trên S3 endpoint; ghi chú vấn đề routing SPA (404 khi refresh) <br> - So sánh S3 hosting vs Amplify Hosting cho React | 18/06/2026 | 18/06/2026 | <https://docs.aws.amazon.com/amplify/> |
| 5 | - Họp nhóm: trình bày preview S3 hosting; thống nhất dashboard hiển thị cảm biến nhiệt độ, độ ẩm, cửa <br> - Phác thảo user flow: mở app → xem trạng thái → điều khiển thiết bị | 19/06/2026 | 19/06/2026 | Repo SmartHome_IoT |

### Thành quả tuần 2:

* Em đã truy cập được **tài khoản AWS dùng chung** và có IAM user lab riêng.
* Hiểu cách **AWS Budgets** giúp nhóm kiểm soát chi phí.
* Deploy thành công bản build React demo lên **S3 static hosting**; nắm được hạn chế routing SPA.
* Nhóm thống nhất luồng trải nghiệm dashboard cơ bản cho SmartHome_IoT.
