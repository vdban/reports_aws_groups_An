---
title: "Blog 3"
date: 2026-07-01
weight: 3
chapter: false
pre: " <b> 3.3. </b> "
---

# TỐI ƯU HÓA MONITORING & DEBUGGING CHO AMAZON EMR ON EC2

Amazon EMR on EC2 vừa bổ sung nhiều cải tiến mới nhằm đơn giản hóa việc giám sát và xử lý sự cố cho các workload Big Data. Các tính năng mới tập trung vào việc thu thập log theo thời gian thực, cải thiện khả năng theo dõi ứng dụng và hỗ trợ quản trị viên phân tích lỗi nhanh hơn.

## Các điểm chính cần nắm:

- Hỗ trợ stream log theo thời gian thực từ EMR Steps, Spark Driver và Spark Executor lên Amazon CloudWatch Logs.
- Cho phép tùy chỉnh CloudWatch Log Group, mã hóa bằng AWS KMS và phân tích log thông qua CloudWatch Logs Insights.
- Hỗ trợ cấu hình đường dẫn Amazon S3 và khóa KMS riêng cho từng EMR Step, giúp tăng cường khả năng phân quyền và bảo mật trong môi trường nhiều người dùng.
- Có thể truy cập trực tiếp YARN ResourceManager UI và Tez UI ngay từ AWS Management Console mà không cần SSH Tunnel hoặc Proxy.
- Hiển thị trực tiếp YARN Application ID trong giao diện chi tiết của EMR Step, giúp dễ dàng đối chiếu với Spark History Server hoặc log container khi phân tích lỗi.
- Mở rộng khả năng thu thập custom metrics của Hadoop, YARN và HBase thông qua CloudWatch Agent với tần suất thu thập lên đến mỗi phút.
- Cho phép cập nhật cấu hình metric trên cluster đang hoạt động mà không cần khởi động lại.
- Hỗ trợ tích hợp với các hệ thống giám sát như Amazon CloudWatch, Prometheus và Grafana để xây dựng dashboard theo nhu cầu.
- Việc sử dụng CloudWatch Logs và CloudWatch Metrics sẽ phát sinh thêm chi phí theo dung lượng log và metric được thu thập.

Những cải tiến này giúp đơn giản hóa đáng kể quá trình monitoring và debugging trên Amazon EMR, đặc biệt với các hệ thống xử lý dữ liệu lớn cần khả năng quan sát và xử lý sự cố nhanh chóng.


---

**…Link…**

- https://www.facebook.com/groups/awsstudygroupfcj/permalink/2225013128263647/

---

**…Hướng dẫn…**

1. Tạo hoặc sử dụng một Amazon EMR Cluster trên EC2.
2. Bật CloudWatch Logs và CloudWatch Agent khi cấu hình cluster.
3. Chạy Spark hoặc Hadoop Job trên EMR.
4. Theo dõi log theo thời gian thực trong CloudWatch Logs.
5. Truy cập YARN ResourceManager UI trực tiếp từ AWS Console.
6. Kiểm tra YARN Application ID để đối chiếu với Spark History hoặc log container.
7. Cấu hình thêm custom metrics nếu cần giám sát Hadoop, YARN hoặc HBase.