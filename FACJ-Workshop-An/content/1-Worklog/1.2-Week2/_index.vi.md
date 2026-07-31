---
title: "Tuần 2 - Nhật ký công việc"
date: 2026-06-15
weight: 2
chapter: false
pre: " <b> 1.2. </b> "
---

### Mục tiêu tuần 2:

* **Tạo tài khoản AWS** (Root MFA, IAM user admin) và thiết lập **AWS Budgets**.
* Tạo tài khoản **Adafruit IO**; học cách tạo **MQTT feeds** cho cảm biến/actuator.
* Publish/subscribe thử từ dashboard Adafruit; hiểu username/key và broker `io.adafruit.com`.
* Họp nhóm: thống nhất tên feed/topic tạm thời trước khi chuyển sang AWS IoT Core.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Tạo tài khoản AWS; bật Root MFA; tạo IAM user admin | 15/06/2026 | 15/06/2026 | <https://docs.aws.amazon.com/accounts/> |
| 2 | - Tìm hiểu Free Tier và billing <br> - Tạo **AWS Budget** hàng tháng kèm email cảnh báo | 16/06/2026 | 16/06/2026 | <https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html> |
| 3 | - Đăng ký **Adafruit IO**; tạo feeds: `temperature`, `humidity`, `light`, `fan`, `light-switch`, `door` | 17/06/2026 | 17/06/2026 | <https://io.adafruit.com/api/docs> |
| 4 | - Học MQTT trên Adafruit: publish giá trị thử từ web UI; subscribe feed bằng MQTT client <br> - Ghi chú format `username/feeds/<feed-key>` | 18/06/2026 | 18/06/2026 | <https://io.adafruit.com/api/docs/mqtt> |
| 5 | - Họp nhóm: map feed Adafruit ↔ payload firmware ESP32 <br> - Em demo publish nhiệt độ giả lập từ Serial Monitor lên feed | 19/06/2026 | 19/06/2026 | Repo SmartHome_IoT `firmware/` |

### Thành quả tuần 2:

* Tài khoản AWS sẵn sàng; Root MFA và **AWS Budgets** đã cấu hình.
* **Adafruit IO feeds** đã tạo; em hiểu luồng publish/subscribe MQTT cơ bản.
* Có bảng map feed ↔ biến firmware để team backend/dashboard tham chiếu.
* Sẵn sàng học IAM IoT policies và IoT Core từ tuần 3.
