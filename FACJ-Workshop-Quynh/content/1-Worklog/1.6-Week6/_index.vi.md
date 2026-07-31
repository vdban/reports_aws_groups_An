---
title: "Tuần 6 - Nhật ký công việc"
date: 2026-07-13
weight: 6
chapter: false
pre: " <b> 1.6. </b> "
---

### Mục tiêu tuần 6:

* Học **S3** sâu hơn: bucket policy, CORS, versioning, phục vụ deploy frontend production.
* Thiết kế **Figma UI** hoàn chỉnh: sensor cards, control panel, Pomodoro timer, cảnh báo cửa.
* Xây dựng design system cơ bản (màu sắc, typography, spacing, component states).
* Họp nhóm: review Figma và thống nhất handoff sang React tuần 7.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Học S3 nâng cao: bucket policy, public access block, **CORS** cho frontend gọi API <br> - Cấu hình CORS rule trên bucket lab; test preflight request | 13/07/2026 | 13/07/2026 | <https://docs.aws.amazon.com/s3/> |
| 2 | - Tìm hiểu S3 versioning và lifecycle; ghi chú chiến lược backup build frontend <br> - Khởi tạo file Figma SmartHome Dashboard; đặt color palette (xanh dương nhẹ, đỏ cảnh báo) | 14/07/2026 | 14/07/2026 | Figma |
| 3 | - Thiết kế **sensor cards**: nhiệt độ, độ ẩm, ánh sáng — icon trực quan, số liệu lớn, trạng thái online/offline <br> - Thêm hover/active state cho card, tạo cảm giác tương tác mượt | 15/07/2026 | 15/07/2026 | Figma |
| 4 | - Thiết kế **control panel**: toggle đèn/quạt, slider độ sáng; **Pomodoro widget** tích hợp góc phải <br> - Thiết kế **door alert banner**: màu đỏ nổi bật, icon cửa mở, animation nhẹ thu hút sự chú ý | 16/07/2026 | 16/07/2026 | Figma |
| 5 | - Hoàn thiện responsive frame (desktop + mobile); export component specs <br> - Họp nhóm: demo Figma; nhận feedback UX; chốt design handoff cho React/Vite tuần 7 | 17/07/2026 | 17/07/2026 | Figma / Repo SmartHome_IoT |

### Thành quả tuần 6:

* Nắm **S3 deep dive** (policy, CORS) — sẵn sàng deploy frontend an toàn.
* **Figma UI** hoàn chỉnh: sensor cards, control panel, Pomodoro, door alerts với visual design nhất quán.
* Design system cơ bản (màu, font, spacing) giúp code React đồng bộ với thiết kế.
* Nhóm approve Figma; em sẵn sàng implement React tuần 7.
