---
title: "Tuần 4 - Nhật ký công việc"
date: 2026-06-29
weight: 4
chapter: false
pre: " <b> 1.4. </b> "
---

### Mục tiêu tuần 4:

* Học **VPC** ở mức tổng quan (subnet, route table, security group) để hiểu backend chạy ở đâu.
* Vẽ **wireframe dashboard trên giấy**: layout, hierarchy thông tin, vị trí các widget.
* Xác định cấu trúc navigation và responsive breakpoints cho mobile/tablet.
* Họp nhóm: review wireframe và thu thập feedback về trải nghiệm người dùng.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Học VPC: CIDR, public/private subnet, Internet Gateway, NAT <br> - Ghi chú EC2 backend nằm trong private subnet, frontend gọi API qua public endpoint | 29/06/2026 | 29/06/2026 | <https://docs.aws.amazon.com/vpc/> |
| 2 | - Tìm hiểu Security Group vs NACL; hiểu vì sao frontend không cần vào VPC trực tiếp <br> - Vẽ sơ đơn giản: User → S3 (React) → API Gateway/EC2 | 30/06/2026 | 30/06/2026 | <https://cloudjourney.awsstudygroup.com/> |
| 3 | - **Wireframe trên giấy**: header (logo, user menu), sidebar navigation, vùng card cảm biến <br> - Chú ý visual hierarchy: số liệu quan trọng (nhiệt độ, cửa mở) nổi bật hơn | 01/07/2026 | 01/07/2026 | Giấy / bút |
| 4 | - Bổ sung wireframe: panel điều khiển đèn/quạt, khu vực thông báo cảnh báo cửa <br> - Phác thảo layout mobile: card xếp dọc, nút điều khiển đủ lớn cho chạm | 02/07/2026 | 02/07/2026 | Giấy / bút |
| 5 | - Họp nhóm: trình bày wireframe; nhận feedback về màu cảnh báo đỏ cho cửa mở, icon trực quan <br> - Cập nhật wireframe v2 theo góp ý UX | 03/07/2026 | 03/07/2026 | Repo SmartHome_IoT |

### Thành quả tuần 4:

* Hiểu **VPC** ở mức cần thiết để biết frontend kết nối backend qua API public.
* Hoàn thành **wireframe dashboard trên giấy** với layout rõ ràng, dễ đọc.
* Xác định navigation và responsive cơ bản cho mobile.
* Wireframe v2 đã được nhóm review; sẵn sàng chuyển sang Figma tuần 6.
