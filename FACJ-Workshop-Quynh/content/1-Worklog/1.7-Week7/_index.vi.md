---
title: "Tuần 7 - Nhật ký công việc"
date: 2026-07-20
weight: 7
chapter: false
pre: " <b> 1.7. </b> "
---

### Mục tiêu tuần 7:

* Triển khai dashboard bằng **React + Vite** theo design Figma.
* Kết nối **backend API** (GET sensors, POST control) với loading và error states.
* Xây dựng **luồng đăng nhập Cognito** trên frontend (sign-in, token, protected routes).
* Họp nhóm: demo tích hợp end-to-end và thu thập feedback UX.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Khởi tạo project **React/Vite**; cấu trúc thư mục `components/`, `pages/`, `services/` <br> - Implement layout chính: header, sidebar, content area theo Figma | 20/07/2026 | 20/07/2026 | Vite / React docs |
| 2 | - Code **SensorCard** component: hiển thị nhiệt độ, độ ẩm, trạng thái cửa; auto-refresh mỗi 5 giây <br> - Thêm skeleton loading khi chờ API, tránh màn hình trống gây khó chịu | 21/07/2026 | 21/07/2026 | Repo SmartHome_IoT |
| 3 | - Kết nối `GET /sensors` qua fetch/axios; map JSON → SensorCard props <br> - Implement **ControlPanel**: toggle đèn/quạt gọi `POST /devices/control`; toast thông báo thành công/lỗi | 22/07/2026 | 22/07/2026 | API contract nhóm |
| 4 | - Tích hợp **Cognito login flow**: form đăng nhập, lưu JWT, redirect sau auth <br> - Protected route: chưa login thì chuyển về `/login`; session hết hạn hiển thị thông báo thân thiện | 23/07/2026 | 23/07/2026 | <https://docs.aws.amazon.com/cognito/> |
| 5 | - Thêm **Pomodoro widget** và **door alert banner** (hiện khi `door_status === open`) <br> - Họp nhóm: demo end-to-end; fix UX nhỏ (font size mobile, màu cảnh báo) theo feedback | 24/07/2026 | 24/07/2026 | Repo SmartHome_IoT |

### Thành quả tuần 7:

* Dashboard **React/Vite** chạy local, bám sát design Figma.
* Kết nối **backend API** thành công với loading/error states mượt mà.
* **Cognito login flow** hoạt động; route được bảo vệ sau xác thực.
* Demo end-to-end được nhóm review; sẵn sàng deploy tuần 8.
