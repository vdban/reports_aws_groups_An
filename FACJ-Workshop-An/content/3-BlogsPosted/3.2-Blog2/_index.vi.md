---
title: "Blog 2"
date: 2026-07-01
weight: 2
chapter: false
pre: " <b> 3.2. </b> "
---

# NÂNG CAO KHẢ NĂNG QUAN SÁT THROTTLING TRONG AMAZON DYNAMODB

Amazon DynamoDB vừa bổ sung nhiều cải tiến về khả năng quan sát (observability) đối với các sự kiện throttling. Các cập nhật mới giúp người dùng nhanh chóng xác định nguyên nhân gây giới hạn thông lượng, từ đó rút ngắn thời gian xử lý sự cố và tối ưu hiệu năng của hệ thống.

## Các điểm chính cần nắm:

- Exception khi xảy ra throttling được mở rộng, cung cấp thông tin chi tiết về nguyên nhân và tài nguyên bị ảnh hưởng (Table hoặc Global Secondary Index - GSI).
- Bổ sung các mã lỗi throttling mới, ví dụ:
  - `TableWriteProvisionedThroughputExceeded`
  - `TableReadKeyRangeThroughputExceeded`
  - Việc phân tách rõ ràng này giúp người dùng dễ dàng đưa ra phương án khắc phục phù hợp.
- Amazon CloudWatch cung cấp thêm các metric mới, phân loại throttling theo từng nguyên nhân cụ thể:
  - Vượt quá thông lượng đã cấp phát (Provisioned Throughput).
  - Vượt quá thông lượng tối đa của chế độ On-Demand.
  - Chạm ngưỡng giới hạn của Account.
  - Vượt quá thông lượng của dải khóa (Key Range Throughput - thường do Hot Partition).
- CloudWatch Contributor Insights hỗ trợ chế độ **Throttled Keys Only**, chỉ ghi nhận các partition key gây ra throttling thay vì phân tích toàn bộ traffic của ứng dụng.
- Chế độ mới này mang lại lợi ích:
  - Dễ dàng xác định hot key và hot partition.
  - Tiết kiệm chi phí giám sát.
  - Phù hợp để bật Contributor Insights trên môi trường production mà không làm tăng quá nhiều chi phí.
- Khuyến cáo cập nhật cách xử lý exception đối với các SDK định kiểu mạnh (Java, .NET, Go). Người dùng nên sử dụng toán tử `instanceof` (hoặc tương đương) thay vì so sánh chính xác tên lớp (class type) để đảm bảo tương thích với các bản cập nhật SDK mới.
- Những cải tiến này giúp tăng tốc đáng kể quá trình debug và tối ưu hóa hiệu suất cho các ứng dụng sử dụng DynamoDB.
