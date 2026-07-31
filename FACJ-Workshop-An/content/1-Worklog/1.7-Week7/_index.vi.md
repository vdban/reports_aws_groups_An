---
title: "Tuần 7 - Nhật ký công việc"
date: 2026-07-20
weight: 7
chapter: false
pre: " <b> 1.7. </b> "
---

### Mục tiêu tuần 7:

* Hoàn thiện firmware: đọc DHT/LDR, điều khiển relay, xử lý lệnh Pomodoro.
* Test end-to-end với backend và dashboard.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Implement đọc cảm biến định kỳ và publish MQTT. | 20/07/2026 | 20/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 2 | - Nhận lệnh bật/tắt quạt/đèn từ cloud; điều khiển relay. | 21/07/2026 | 21/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 3 | - Xử lý handler Pomodoro (timer) theo yêu cầu frontend. | 22/07/2026 | 22/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 4 | - Test E2E: ESP32 → IoT → backend → UI hiển thị đúng. | 23/07/2026 | 23/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 5 | - Ghi bug list (reconnect, debounce sensor) cho tuần 8. | 24/07/2026 | 24/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |

### Thành quả tuần 7:

* Firmware đầy đủ tính năng lab.
* E2E test pass với nhóm.
