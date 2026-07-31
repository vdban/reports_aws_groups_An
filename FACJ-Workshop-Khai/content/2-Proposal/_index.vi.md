---
title: "Bản đề xuất"
date: 2026-07-01
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

# Smart Home IoT Platform  
## Hệ thống quản lý và tự động hóa nhà thông minh trên AWS Cloud

### 1. Tổng quan dự án

**Smart Home IoT Platform** là hệ thống quản lý và tự động hóa thiết bị gia đình, kết hợp **vi điều khiển phân tán** (ESP32) và **hạ tầng điện toán đám mây AWS**. Hệ thống được thiết kế nhằm tập trung hóa quyền điều khiển không gian sống, tối ưu hóa mức tiêu thụ năng lượng và cung cấp kiến trúc linh hoạt, dễ mở rộng cho hộ gia đình hoặc doanh nghiệp nhỏ.

Trong kỳ thực tập **FCAJ**, nhóm triển khai dự án **SmartHome_IoT** — dashboard React, backend Node.js trên EC2 (Nginx), DynamoDB, Cognito, IoT Core và CloudFormation — phục vụ demo, nghiệm thu và báo cáo kỹ thuật.

![Kiến trúc SmartHome_IoT](/images/workshop/Diagram.png)

### 2. Mục tiêu

- Triển khai thành công mạng lưới IoT gồm **ít nhất 5 node cảm biến** (đo nhiệt độ, ánh sáng, chuyển động) kết nối tập trung về Dashboard quản lý.
- Đảm bảo **thời gian phản hồi thấp** từ thao tác người dùng trên Dashboard đến khi thiết bị thực thi lệnh.
- Triển khai **website báo cáo dự án** dạng trang tĩnh bằng **Hugo**, tự động deploy trên **AWS Amplify** nhằm tối ưu tốc độ tải và khả năng đáp ứng.
- Tích hợp **kịch bản tự động hóa** tùy biến linh hoạt, giải quyết trực tiếp bài toán tiết kiệm năng lượng.
- Hoàn thiện, đóng gói toàn bộ hệ thống và **bàn giao báo cáo kỹ thuật chuẩn hóa** trong **8 tuần**.

### 3. Vấn đề cần giải quyết

Hiện nay, các giải pháp nhà thông minh thương mại thường gặp rào cản lớn về chi phí và tính tùy biến:

**Phân mảnh & phụ thuộc hệ sinh thái** — Mỗi hãng thiết bị bắt buộc dùng một ứng dụng riêng, khó quản lý tập trung.

**Thiếu khả năng tự chủ** — Phụ thuộc hoàn toàn vào hạ tầng đám mây bên thứ ba, nguy cơ gián đoạn khi nhà mạng gặp sự cố hoặc dịch vụ ngừng hỗ trợ.

Với quy mô **nhà ở đơn lập / căn hộ nhỏ** cho một gia đình, hệ thống cần hạ tầng đám mây riêng biệt, **tối ưu chi phí** nhưng **đảm bảo an toàn**. Việc kết hợp:

- **Amazon EC2 + Nginx** — xử lý logic nâng cao và host Dashboard điều khiển;
- **AWS IoT Core** — quản lý kết nối thiết bị MQTT;
- **Amazon Cognito** — phân quyền thành viên trong gia đình;

sẽ mang lại trải nghiệm điều khiển **tập trung** và **bảo mật**.

### 4. Kiến trúc giải pháp

#### 4.1 Lớp thiết bị & phần cứng (IoT Layer)

- Sử dụng vi điều khiển **ESP32** đặt tại các phòng để thu thập dữ liệu cảm biến (nhiệt độ, độ ẩm, chuyển động) và điều khiển thiết bị (đèn, rơ-le, quạt).
- Các node giao tiếp qua **Wi-Fi nội bộ** bằng giao thức **MQTT** nhẹ, truyền bản tin mã hóa (TLS).
- Hỗ trợ **Virtual ESP32** trên EC2 để demo khi chưa có phần cứng.

#### 4.2 Lớp mạng & đám mây (AWS Cloud Infrastructure Layer)

| Dịch vụ AWS | Vai trò |
| ----------- | ------- |
| **Amazon VPC** | Mạng nội bộ ảo cách ly tài nguyên Backend, bảo vệ khỏi truy cập trái phép từ Internet |
| **AWS IoT Core** | Central MQTT Broker — tiếp nhận telemetry và gửi lệnh điều khiển xuống thiết bị |
| **Amazon EC2 & Nginx** | Reverse Proxy & Web Server — host Dashboard SmartHome, proxy `/api` → Node.js backend |
| **Amazon DynamoDB** | NoSQL — lưu telemetry thời gian thực và lịch sử trạng thái thiết bị |
| **AWS IAM & AWS CLI** | Phân quyền IAM; quản trị viên khởi tạo và vận hành hạ tầng bằng CLI |
| **AWS CloudFormation** | Infrastructure as Code — triển khai VPC, EC2, DynamoDB, Cognito, CloudWatch bằng một stack |
| **Amazon CloudWatch** | Giám sát hiệu năng, log EC2/Nginx/IoT, cảnh báo sự cố bất thường |

#### 4.3 Lớp ứng dụng & báo cáo (Application, Auth & Reporting Layer)

| Thành phần | Mô tả |
| ---------- | ----- |
| **AWS Cognito** | Xác thực người dùng (thành viên gia đình / nhóm lab); phân quyền Admin / User qua Token |
| **SmartHome Dashboard** | React SPA trên EC2 (Nginx) — giám sát realtime, điều khiển thiết bị, SSE push |
| **Website báo cáo (AWS Amplify)** | Trang Hugo deploy tự động từ GitHub; gắn link trực tiếp tới Dashboard EC2 để nghiệm thu và demo |

### 5. Timeline

Lộ trình **8 tuần**, nhóm **5 thành viên** (1 Trưởng nhóm, 2 Kỹ sư Nhúng, 1 Kỹ sư Backend/Cloud, 1 Kỹ sư Frontend):

| Giai đoạn | Hạng mục công việc cốt lõi | Phân bổ trách nhiệm | Đầu ra |
| --------- | -------------------------- | ------------------- | ------ |
| **Tuần 1–2** | Phân tích yêu cầu, thiết kế sơ đồ khối, lựa chọn linh kiện, thiết lập môi trường (GitHub, AWS) | Trưởng nhóm, Backend, Nhúng | CloudFormation template, sơ đồ kiến trúc |
| **Tuần 3–4** | Lập trình ESP32; nạp chứng chỉ IoT Core; prototype MQTT | 2 Kỹ sư Nhúng | ESP32 gửi/nhận MQTT ổn định |
| **Tuần 5–6** | Cấu hình EC2 + Nginx host Dashboard; tích hợp Cognito Auth; DynamoDB | Backend/Cloud, Frontend | Luồng dữ liệu End-to-End; website Amplify gắn link Nginx |
| **Tuần 7–8** | CloudWatch Logs/Metrics; kiểm thử độ trễ, Edge Fallback; cập nhật nghiệm thu lên Amplify; báo cáo Hugo | Toàn nhóm 5 người | Hệ thống hoàn thiện; báo cáo nghiệm thu trên Amplify |

### 6. Ngân sách dự kiến

| Hạng mục | Chi phí dự kiến | Ghi chú |
| -------- | --------------- | ------- |
| **Máy chủ & Nginx App (EC2)** | **0 VNĐ** | Instance t3.micro — AWS Free Tier |
| **Cơ sở dữ liệu (DynamoDB)** | **0 VNĐ** | Free Tier — lưu trữ lên tới 25 GB |
| **IoT Core & Cognito** | **0 VNĐ** | Hạn ngạch MQTT và MAU miễn phí |
| **VPC, CloudFormation, CloudWatch, IAM** | **0 VNĐ** | Dịch vụ quản lý hạ tầng — không phí khởi tạo |
| **Website báo cáo (Amplify & GitHub)** | **0 VNĐ** | Free Tier Amplify + GitHub CI/CD |
| **Thiết bị phần cứng (IoT Nodes)** | **~900.000 VNĐ** | ESP32, module cảm biến, rơ-le (chi phí thực tế duy nhất) |

> Chi phí vận hành cloud **gần như bằng 0** trong giai đoạn lab nhờ Free Tier; chi phí chính tập trung vào **phần cứng IoT**.

### 7. Rủi ro

#### Rủi ro

| Rủi ro | Mô tả |
| ------ | ----- |
| Gián đoạn Internet/Wi-Fi | ESP32 mất kết nối Cloud, không nhận lệnh từ App hoặc IoT Core |
| Sự cố Nginx / EC2 | Cấu hình lỗi hoặc EC2 quá tải → Dashboard gián đoạn |
| Độ trễ điều khiển cao | Nghẽn mạng hoặc EC2 xử lý chậm → bật/tắt thiết bị bị hoãn |

#### Chiến lược giảm thiểu

- Thiết lập cơ chế **Heartbeat Ping** định kỳ giữa ESP32 và Router Wi-Fi.
- Sử dụng **PM2 / Docker** đóng gói Nginx/Backend — môi trường chạy đồng nhất trên EC2.
- Kiểm thử **Redirect và CORS** trên môi trường Staging/Local trước khi deploy production.

#### Kế hoạch dự phòng

- Tích hợp **Edge Fallback** — ESP32 tự duy trì chế độ local cơ bản khi mất kết nối cloud.
- Dùng **AWS CloudFormation** re-deploy nhanh EC2/Nginx chỉ bằng lệnh CLI.
- Tối ưu kích thước **MQTT payload** để giảm độ trễ và chi phí message.

### 8. Kết quả kỳ vọng

#### Sản phẩm bàn giao

- Bộ phần cứng **Gateway / Nodes ESP32** hoàn chỉnh, lắp đặt thử nghiệm tại một căn hộ / ngôi nhà nhỏ.
- **SmartHome Dashboard** ổn định trên Nginx/EC2, phân quyền bằng **AWS Cognito**.
- **Website báo cáo** trên **AWS Amplify** (Hugo) — tài liệu kỹ thuật, kiến trúc, link trực tiếp tới Dashboard demo.
- **CloudFormation stack** khởi tạo VPC, EC2, DynamoDB, IoT Core, Cognito, CloudWatch.

#### Về mặt kỹ thuật & hiệu năng

- Độ trễ điều khiển bật/tắt thiết bị qua Internet **thấp**.
- Hệ thống an toàn trong **VPC**; Nginx là lớp bảo vệ; giám sát **24/7** qua CloudWatch.

#### Giá trị thực tiễn

Gia đình / nhóm lab có giải pháp SmartHome **tự chủ**, **ít chi phí duy trì hàng tháng**, bảo mật chuẩn doanh nghiệp nhưng phù hợp quy mô nhà ở — đồng thời là nền tảng học tập AWS end-to-end cho kỳ thực tập FCAJ.
