---
title: "Tuần 8 - Nhật ký công việc"
date: 2026-07-27
weight: 8
chapter: false
pre: " <b> 1.8. </b> "
---

### Mục tiêu tuần 8:

* **Deploy frontend** lên S3 static hosting hoặc **AWS Amplify**.
* Polish UI: spacing, animation, responsive trên mobile, accessibility cơ bản.
* Chụp **screenshot demo** chất lượng cao cho báo cáo workshop và slide thuyết trình.
* Họp nhóm: demo cuối kỳ và hoàn thiện tài liệu frontend.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Build production (`npm run build`); kiểm tra bundle size và env variables (API URL, Cognito pool ID) <br> - Deploy lên **S3** bucket production; cấu hình bucket policy và CORS | 27/07/2026 | 27/07/2026 | <https://docs.aws.amazon.com/s3/> |
| 2 | - Thử deploy qua **Amplify Hosting**; so sánh CI/CD tự động vs upload S3 thủ công <br> - Chọn phương án cuối; cấu hình custom error document cho SPA routing | 28/07/2026 | 28/07/2026 | <https://docs.aws.amazon.com/amplify/> |
| 3 | - **UI polish**: chỉnh spacing card, thêm transition mượt cho toggle, tối ưu font trên mobile <br> - Kiểm tra door alert banner hiển thị đúng màu và vị trí trên mọi breakpoint | 29/07/2026 | 29/07/2026 | Figma / Chrome DevTools |
| 4 | - Chụp **screenshot demo**: trang login, dashboard đầy đủ sensor, cảnh báo cửa mở, control panel <br> - Ghi chú caption cho từng ảnh phục vụ báo cáo workshop | 30/07/2026 | 30/07/2026 | Snipping Tool / Figma |
| 5 | - Họp nhóm: **demo cuối kỳ** SmartHome dashboard live trên cloud <br> - Cập nhật README frontend (setup, deploy, env); nộp worklog và ảnh demo cho báo cáo | 31/07/2026 | 31/07/2026 | Repo SmartHome_IoT |

### Thành quả tuần 8:

* Frontend **deploy thành công** lên S3/Amplify; truy cập được qua URL public.
* UI đã được **polish** — trải nghiệm mượt, responsive, visual design nhất quán.
* Bộ **screenshot demo** đầy đủ cho báo cáo và slide thuyết trình.
* Hoàn thành demo cuối kỳ; em tự tin trình bày phần frontend SmartHome_IoT.
