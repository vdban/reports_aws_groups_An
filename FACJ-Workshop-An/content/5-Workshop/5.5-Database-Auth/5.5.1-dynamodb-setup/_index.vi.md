---
title: "Mô hình dữ liệu / RDS"
date: 2026-07-01
weight: 1
chapter: false
pre: " <b> 5.5.1. </b> "
---

# Dữ liệu SmartHome_IoT trên Amazon RDS

### Ví dụ bảng
| Bảng | Mục đích |
| ---- | -------- |
| `sensor_readings` | Nhiệt độ, độ ẩm, ánh sáng |
| `device_commands` | Lệnh light / fan / door / sensor |
| `door_events` | Nhật ký an ninh |
| `notifications` | Thông báo người dùng |
| `settings` | Cấu hình devices + pomodoro |

### Gợi ý lab
- Private subnet + SG chỉ từ EC2
- Connection string trong `.env` trên EC2 (IAM Role cho API AWS khác)
- Backup/snapshot tuỳ chọn khi demo
