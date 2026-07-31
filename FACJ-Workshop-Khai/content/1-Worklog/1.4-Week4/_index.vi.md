---
title: "Tuần 4 - Nhật ký công việc"
date: 2026-06-29
weight: 4
chapter: false
pre: " <b> 1.4. </b> "
---

### Mục tiêu tuần 4:

* Hiểu cách bảo vệ API qua cấu hình mạng ảo.
* Mở các cổng cần thiết cho backend giao tiếp với frontend.
* Đảm bảo chỉ expose đúng phần cần thiết ra ngoài.

### Công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| ---- | --------- | ------------ | ---------------- | ------------------ |
| 1 | - Học khái niệm VPC và security group qua tài liệu AWS. | 29/06/2026 | 29/06/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 2 | - Rà soát rule inbound/outbound cho máy chạy API. | 30/06/2026 | 30/06/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 3 | - Thử kết nối từ máy dev tới cổng API sau khi cấu hình. | 01/07/2026 | 01/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 4 | - Trao đổi với DevOps về rule mạng trước khi deploy thật. | 02/07/2026 | 02/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |
| 5 | - Ghi chú sơ đồ luồng request từ giao diện tới backend. | 03/07/2026 | 03/07/2026 | Portal FCAJ / <https://cloudjourney.awsstudygroup.com/> |

### Thành quả tuần 4:

* Security group phù hợp cho API đã được thống nhất.
* Em hiểu vì sao frontend gọi HTTPS endpoint thay vì truy cập trực tiếp máy chủ.
* Sẵn sàng chạy backend trên EC2 tuần 5.
