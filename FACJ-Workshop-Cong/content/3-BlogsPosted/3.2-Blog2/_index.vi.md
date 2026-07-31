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
- Các mã lý do (Reason) mới như:
  - `TableWriteProvisionedThroughputExceeded`
  - `TableReadKeyRangeThroughputExceeded`
  - Giúp xác định nhanh loại throttling đang xảy ra.
- CloudWatch Metrics được bổ sung nhiều chỉ số mới, phân loại theo từng nguyên nhân:
  - Provisioned Throughput vượt giới hạn.
  - Max On-Demand Throughput đạt ngưỡng cấu hình.
  - Account Throughput Limit.
  - Key Range Throughput (Hot Partition).
- CloudWatch Contributor Insights hỗ trợ chế độ **Throttled Keys Only**, chỉ ghi nhận các partition key thực sự gây throttling thay vì toàn bộ lưu lượng truy cập.
- Chế độ mới giúp:
  - Dễ dàng phát hiện hot key và hot partition.
  - Giảm chi phí monitoring so với việc phân tích toàn bộ traffic.
  - Phù hợp để sử dụng trên môi trường production.
- AWS cũng cập nhật cách xử lý exception trong một số SDK strongly typed (Java, .NET, Go), khuyến nghị sử dụng kiểm tra kiểu bằng `instanceof` thay vì so sánh chính xác lớp exception nhằm đảm bảo khả năng tương thích với các phiên bản SDK mới.
- Các cải tiến này giúp việc xác định nguyên nhân throttling và tối ưu thiết kế bảng DynamoDB trở nên nhanh chóng và hiệu quả hơn.

Những tính năng mới đặc biệt hữu ích đối với các hệ thống có lưu lượng truy cập lớn, nơi hiện tượng throttling thường xuyên xảy ra do phân bố dữ liệu không đồng đều hoặc giới hạn thông lượng.

---

**…Hình ảnh…**

- Kiến trúc xử lý yêu cầu của Amazon DynamoDB.
- Ví dụ exception mới hiển thị nguyên nhân throttling.
- CloudWatch Metrics theo từng loại throttling.
- Contributor Insights hiển thị Hot Keys.

---

**…Link…**

- AWS Database Blog – Enhanced Throttling Observability in Amazon DynamoDB

---

**…Hướng dẫn…**

1. Theo dõi các exception khi ứng dụng truy cập DynamoDB.
2. Xác định nguyên nhân throttling thông qua trường **Reason** trong exception.
3. Kiểm tra các CloudWatch Metrics mới để xác định loại giới hạn đang gặp phải.
4. Bật CloudWatch Contributor Insights với chế độ **Throttled Keys Only** để xác định hot partition.
5. Thực hiện tối ưu capacity, thiết kế partition key hoặc yêu cầu tăng Service Quota nếu cần.
