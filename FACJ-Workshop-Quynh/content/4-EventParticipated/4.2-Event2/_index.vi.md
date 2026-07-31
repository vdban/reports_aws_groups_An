---
title: "Event 2"
date: 2026-07-11
weight: 2
chapter: false
pre: " <b> 4.2. </b> "
---

# Bài thu hoạch sự kiện: First Cloud AI Journey

## Mục đích của sự kiện

Sự kiện **First Cloud AI Journey** được tổ chức nhằm chia sẻ kiến thức thực tiễn về Cloud Computing, System Monitoring, AWS Certification và Application Security. Chương trình giúp người tham dự hiểu rõ hơn cách các doanh nghiệp vận hành hệ thống trên AWS, xây dựng chiến lược giám sát hiệu quả, chuẩn bị cho chứng chỉ AWS Cloud Practitioner và ứng dụng AI vào quy trình bảo mật hiện đại.

---

## Danh sách diễn giả

- **Nguyễn Huỳnh Sơn** – Cựu Infrastructure Reliability Engineer tại SPS
- **Ngô Lê Tấn Huy** – Diễn giả chuyên đề AWS Cloud Practitioner
- **Thịnh Nguyễn** – DevOps/DevSecOps/Cloud Engineer tại Styl Solutions

---



## Nội dung nổi bật



### 1. SLA và Giám sát hệ thống (Monitoring)

**Diễn giả:** Nguyễn Huỳnh Sơn

Buổi chia sẻ giúp người tham dự hiểu đúng về vai trò của Monitoring trong việc đảm bảo chất lượng dịch vụ (SLA).

Các nội dung nổi bật:

- Monitoring là một phần trong quy trình quản lý rủi ro (Risk Management), bao gồm:
  - Identify
  - Monitor
  - Respond
  - Improve
- Monitoring Pyramid được chia thành nhiều tầng:
  - Cloud Provider
  - Infrastructure
  - Application
  - Business
  - Customer Experience
- Một hệ thống có CPU, RAM hoặc Network hoạt động bình thường chưa chắc đã mang lại trải nghiệm tốt cho người dùng.
- Monitoring nên tập trung vào các chỉ số phản ánh trực tiếp trải nghiệm khách hàng như:
  - Login Success Rate
  - Payment Success Rate
  - API Availability
  - User Journey

---



### 2. Chiến lược chinh phục AWS Cloud Practitioner

**Diễn giả:** Ngô Lê Tấn Huy

Buổi chia sẻ giới thiệu lộ trình học và các phương pháp ôn tập hiệu quả cho chứng chỉ AWS Certified Cloud Practitioner (CLF-C02).

Các nội dung chính:

- Cấu trúc bài thi gồm 4 Domain:
  - Cloud Concepts (24%)
  - Security and Compliance (30%)
  - Cloud Technology and Services (34%)
  - Billing, Pricing and Support (12%)
- Giới thiệu các lợi ích của AWS Cloud và các framework quan trọng:
  - AWS Well-Architected Framework
  - AWS Cloud Adoption Framework
- Chia sẻ nhiều mẹo làm bài thi:
  - Keyword Thinking
  - Elimination Method
  - Flag for Review
  - Nhận diện các "bẫy" trong câu hỏi

---



### 3. Bảo mật ứng dụng với AWS Security Agent

**Diễn giả:** Thịnh Nguyễn

Phần trình bày giới thiệu cách AI Agent hỗ trợ tự động hóa quy trình bảo mật ứng dụng.

Các nội dung nổi bật:

- Những hạn chế của Penetration Testing truyền thống:
  - Tốn nhiều thời gian
  - Chi phí cao
  - Phụ thuộc vào chuyên gia bảo mật
- Frontier Agent trên Amazon Bedrock có thể:
  - Review tài liệu thiết kế
  - Phân tích Pull Request
  - Quét mã nguồn
  - Thực hiện kiểm thử bảo mật tự động
- AI Agent hoạt động theo mô hình trả phí theo thời gian xử lý (Task-Hour).
- AI vẫn còn một số giới hạn:
  - Không vượt qua được MFA/Biometrics
  - Khó phát hiện các lỗi liên quan đến Business Logic

---



## Những gì học được



### Tư duy Monitoring

Sau buổi chia sẻ, mình nhận ra rằng Monitoring không chỉ đơn thuần là theo dõi CPU hay Memory.

Điều quan trọng hơn là theo dõi những gì khách hàng thực sự trải nghiệm.

Một Dashboard toàn màu xanh không đồng nghĩa với việc hệ thống đang phục vụ người dùng tốt.

---



### Kiến trúc và Bảo mật

Một kiến thức quan trọng khác là **Shared Responsibility Model**.

AWS chịu trách nhiệm về **Security of the Cloud**, trong khi khách hàng chịu trách nhiệm về **Security in the Cloud**.

Ngoài ra, AI có thể hỗ trợ nhiều công đoạn trong SDLC như:

- Design Review
- Code Review
- Security Scan
- Automated Fix

---



### Chiến lược học tập

Buổi chia sẻ cũng nhấn mạnh rằng:

- Thực hành trên AWS Free Tier quan trọng hơn chỉ đọc tài liệu.
- Sau mỗi bài thi thử cần phân tích kỹ những câu sai để hiểu tư duy của đề thi.
- Chứng chỉ chỉ là bước khởi đầu, kiến thức thực hành mới là yếu tố quyết định.

---



## Ứng dụng vào công việc và học tập

Sau chương trình, mình dự định áp dụng những kiến thức đã học như sau:

### Cải thiện Monitoring

- Xây dựng thêm CloudWatch Alarm.
- Theo dõi API Success Rate.
- Theo dõi Business Metrics thay vì chỉ CPU và Memory.



### Chuẩn bị AWS Certification

- Áp dụng phương pháp Keyword Thinking.
- Ôn tập theo từng Domain.
- Luyện đề và phân tích lỗi sai.



### Cải thiện bảo mật CI/CD

- Tích hợp Code Security Review vào Pull Request.
- Nghiên cứu các công cụ AI hỗ trợ Security Review.
- Áp dụng DevSecOps trong quy trình phát triển phần mềm.

---



## Trải nghiệm tại sự kiện

Tham gia First Cloud AI Journey là một trải nghiệm rất bổ ích.

Các diễn giả đều là những kỹ sư đang làm việc trực tiếp với hệ thống Production nên các ví dụ rất thực tế.

Mình đặc biệt ấn tượng với:

- Cách xây dựng Alert Flow từ Metric → Alarm → SNS.
- Góc nhìn Customer-first trong Monitoring.
- Việc ứng dụng Amazon Bedrock để tự động hóa Security Review.

Không khí của sự kiện rất cởi mở, tạo điều kiện để người tham dự đặt câu hỏi và trao đổi trực tiếp với diễn giả.

---



## Bài học rút ra

Sau chương trình, mình rút ra một số bài học quan trọng:

- AWS đảm bảo hạ tầng Cloud, nhưng doanh nghiệp phải chịu trách nhiệm về trải nghiệm của khách hàng.
- Monitoring hiệu quả cần tập trung vào Business Metrics thay vì chỉ Infrastructure Metrics.
- Chứng chỉ AWS giúp xây dựng nền tảng kiến thức, nhưng kỹ năng thực hành mới là yếu tố quyết định.
- AI không thay thế hoàn toàn kỹ sư, nhưng có thể tự động hóa nhiều công việc và nâng cao hiệu quả bảo mật nếu được áp dụng đúng cách.

---



## Một số hình ảnh khi tham gia sự kiện

> *(Chèn hình ảnh tham gia sự kiện tại đây.)*

---



## Kết luận

First Cloud AI Journey không chỉ mang lại kiến thức về AWS, Monitoring và Security mà còn giúp mình thay đổi cách nhìn về việc vận hành hệ thống hiện đại. Chương trình nhấn mạnh tư duy lấy khách hàng làm trung tâm, kết hợp giữa kiến thức Cloud, AI và DevSecOps để xây dựng những hệ thống an toàn, đáng tin cậy và có khả năng mở rộng trong tương lai.