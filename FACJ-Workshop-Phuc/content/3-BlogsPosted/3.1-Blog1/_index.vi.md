---
title: "Blog 1"
date: 2026-07-01
weight: 1
chapter: false
pre: " <b> 3.1. </b> "
---

# AWS AMPLIFY HOSTING VÀ AWS WAF CHO TRIỂN KHAI WEB DEMO

AWS Amplify Hosting là dịch vụ giúp triển khai (host) các ứng dụng web tĩnh và frontend hiện đại một cách nhanh chóng. Mới đây, AWS đã bổ sung khả năng tích hợp trực tiếp AWS WAF vào Amplify Hosting, cho phép người dùng tăng cường bảo mật website mà không cần cấu hình thêm CloudFront hay các thành phần hạ tầng phức tạp.

## Các điểm chính cần nắm:

- AWS Amplify Hosting hỗ trợ triển khai website chỉ trong vài phút thông qua kết nối với GitHub, GitLab hoặc Bitbucket, hoặc tải trực tiếp thư mục build lên Amplify Console.
- Tích hợp sẵn quy trình CI/CD, tự động build và deploy mỗi khi có thay đổi trên repository.
- Cung cấp sẵn tên miền mặc định cùng chứng chỉ SSL/TLS (HTTPS), giúp website có thể truy cập ngay sau khi triển khai.
- Hỗ trợ triển khai nhiều framework frontend phổ biến như React, Vue, Angular, Next.js, Nuxt và các website tĩnh (HTML/CSS/JavaScript).
- AWS WAF được tích hợp trực tiếp trong Amplify Console, giúp cấu hình bảo mật ngay trên giao diện quản lý mà không cần thiết lập riêng CloudFront hoặc các dịch vụ bổ sung.
- Có thể áp dụng các Web ACL để:
  - Chặn hoặc cho phép truy cập theo địa chỉ IP.
  - Giới hạn truy cập theo khu vực địa lý (Geo Match).
  - Áp dụng Managed Rules của AWS nhằm bảo vệ khỏi các lỗ hổng web phổ biến (OWASP Top 10), bot độc hại và các nguồn IP có rủi ro cao.
- Phù hợp với các dự án Workshop, Demo, Proof of Concept (PoC) hoặc MVP khi cần triển khai nhanh nhưng vẫn đảm bảo các lớp bảo vệ cơ bản.
- Người dùng cần lưu ý AWS Amplify Hosting và AWS WAF đều phát sinh chi phí theo mức sử dụng, vì vậy nên theo dõi Billing để tránh phát sinh ngoài mong muốn.

Việc tích hợp AWS WAF trực tiếp vào Amplify Hosting giúp rút ngắn đáng kể thời gian triển khai hạ tầng, đồng thời bổ sung thêm các cơ chế bảo vệ mà trước đây thường chỉ xuất hiện trong các hệ thống production.

---

**…Hình ảnh…**

- Giao diện triển khai ứng dụng trên AWS Amplify.
- Giao diện cấu hình AWS WAF trong Amplify Console.
- Minh họa luồng CI/CD từ GitHub đến Amplify Hosting.

---

**…Link…**

- AWS News Blog – Firewall support for AWS Amplify hosted sites
- AWS Mobile Blog – AWS Amplify Hosting adds Web Application Firewall protection (Public Preview)

---

**…Hướng dẫn…**

1. Chuẩn bị mã nguồn website và đẩy lên GitHub/GitLab/Bitbucket (hoặc build sẵn thư mục tĩnh).
2. Truy cập AWS Amplify Console và tạo một ứng dụng Hosting mới.
3. Kết nối repository hoặc tải trực tiếp thư mục build lên Amplify.
4. Chờ Amplify tự động build và deploy website.
5. Sau khi website hoạt động, mở mục **Hosting → Firewall** để liên kết hoặc tạo mới AWS WAF Web ACL.
6. Cấu hình các Managed Rules hoặc các quy tắc IP, Geo Match theo nhu cầu.
7. Kiểm tra website thông qua URL HTTPS do Amplify cung cấp và xác nhận các quy tắc bảo mật hoạt động đúng như mong muốn.
