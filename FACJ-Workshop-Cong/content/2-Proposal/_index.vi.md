---
title: "Bản đề xuất"
date: 2026-07-01
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

# SmartHome_IoT  
## Giải pháp AWS hợp nhất cho giám sát và điều khiển nhà thông minh thời gian thực

### 1. Tóm tắt điều hành

**SmartHome_IoT** được thiết kế cho nhóm thực tập tại **FCAJ**, TP. Hồ Chí Minh, nhằm xây dựng nền tảng giám sát và điều khiển nhà thông minh phục vụ học tập, demo và nghiên cứu IoT trên AWS. Hệ thống hỗ trợ **1–3 thiết bị ESP32** (có thể mở rộng thêm actuator/cảm biến), thu thập nhiệt độ, độ ẩm, ánh sáng; điều khiển đèn, quạt, cửa; cảnh báo an ninh và luồng Pomodoro. Dữ liệu thiết bị truyền qua **MQTT** (Adafruit IO / **AWS IoT Core**). Nền tảng tận dụng **Amazon VPC**, **EC2**, **RDS**, **S3**, **Lambda**, **API Gateway**, **Cognito**, **CloudWatch** và **AWS Budgets** để cung cấp giám sát thời gian thực, quản lý tập trung và kiểm soát chi phí lab, với quyền truy cập an toàn cho thành viên nhóm qua **Amazon Cognito**.

### 2. Tuyên bố vấn đề

#### Vấn đề hiện tại

Các demo nhà thông minh hiện có thường dùng Firebase hoặc server cục bộ, credential rải rác trong mã nguồn, thiếu hạ tầng cloud thống nhất và không có cơ chế giám sát chi phí. Khi tích hợp nhiều module (ESP32, backend, dashboard), việc quản lý dữ liệu cảm biến, lệnh điều khiển và sự kiện an ninh trở nên phân mảnh; khó mở rộng, khó bảo trì và không phù hợp làm nền tảng học AWS cho intern.

#### Giải pháp

Nền tảng **SmartHome_IoT** chuyển sang stack AWS nhất quán: thiết bị **ESP32** gửi dữ liệu qua **MQTT** tới **AWS IoT Core**; backend Node.js chạy trên **Amazon EC2** với **IAM Role for EC2** (không hard-code access key); dữ liệu cảm biến, lệnh và sự kiện lưu trên **Amazon RDS** (hoặc **DynamoDB** cho mô hình NoSQL single-table); giao diện **React/Vite** host trên **Amazon S3**; xác thực qua **Amazon Cognito**; **Lambda** và **API Gateway** hỗ trợ các API serverless bổ sung; **CloudWatch** và **AWS Budgets** giám sát vận hành và chi phí. Tương tự các nền tảng IoT phổ biến (ThingsBoard, CoreIoT), người dùng có thể theo dõi dashboard thời gian thực và gửi lệnh điều khiển, nhưng giải pháp này tối ưu cho quy mô lab nhỏ, chi phí thấp và mục đích học tập nội bộ. Các tính năng chính: dashboard giám sát, điều khiển thiết bị (manual/auto), log sự kiện cửa, Pomodoro và cảnh báo chi phí AWS.

#### Lợi ích và hoàn vốn đầu tư (ROI)

Giải pháp tạo nền tảng thực hành AWS end-to-end cho intern (VPC → EC2 → RDS/S3 → Cognito → CloudWatch), đồng thời cung cấp codebase có thể mở rộng cho các dự án IoT lab sau này. Hệ thống tập trung thay thế việc chạy server cục bộ và quản lý credential thủ công, đơn giản hóa tích hợp module (firmware, backend, frontend) và cải thiện độ tin cậy dữ liệu. Chi phí hạ tầng lab ước tính **~1,20 USD/tháng** (Free Tier + tắt EC2/RDS khi không dùng), tổng **~14,40 USD/12 tháng**. Phần cứng ESP32 và cảm biến đã có sẵn hoặc chi phí một lần thấp (~30–50 USD/bộ). Thời gian hoàn vốn **6–12 tháng** nhờ tiết kiệm thời gian setup, debug và vận hành thủ công so với mô hình phân mảnh trước đây.

### 3. Kiến trúc giải pháp

Nền tảng áp dụng kiến trúc **AWS hybrid** (EC2 + managed services + serverless bổ sung) để quản lý dữ liệu từ 1–3 thiết bị ESP32, có thể mở rộng thêm node IoT. Dữ liệu thiết bị tiếp nhận qua **AWS IoT Core** (MQTT); backend **Node.js** trên **EC2** xử lý logic tự động hóa, chuyển tiếp lệnh và ghi **RDS**/**DynamoDB**; **S3** host dashboard React; **Cognito** bảo vệ truy cập; **Lambda** + **API Gateway** cho API serverless khi cần; **CloudWatch** + **Budgets** giám sát vận hành.

![Kiến trúc SmartHome_IoT](/images/Diagram.png)

#### Dịch vụ AWS sử dụng

| Dịch vụ | Vai trò |
| ------- | ------- |
| **Amazon VPC** | Mạng lab: public subnet (EC2), private subnet (RDS) |
| **Amazon EC2** + **IAM Role** | Chạy backend Node.js (`server.js`), automation rules |
| **AWS IoT Core** | Tiếp nhận/gửi MQTT từ ESP32 (cảm biến, actuator, Pomodoro) |
| **Amazon RDS** | Lưu dữ liệu cảm biến, lệnh điều khiển, sự kiện an ninh |
| **Amazon DynamoDB** | (Tuỳ chọn) Single-table design — học NoSQL, backend migration |
| **Amazon S3** | Host frontend React/Vite (static website) |
| **AWS Lambda** | Xử lý API/event serverless bổ sung |
| **Amazon API Gateway** | REST API cho frontend và tích hợp bên ngoài |
| **Amazon Cognito** | User Pool — đăng nhập dashboard, giới hạn người dùng lab |
| **Amazon CloudWatch** | Metrics, logs, alarms (EC2, RDS, IoT) |
| **AWS Budgets** | Cảnh báo chi phí lab |
| **AWS CLI** | Provision, deploy và vận hành từ terminal |

#### Thiết kế thành phần

| Thành phần | Mô tả |
| ---------- | ----- |
| **Thiết bị biên** | ESP32 (`code/`) — cảm biến DHT/light, relay đèn/quạt, cảm biến cửa; gửi MQTT qua Wi-Fi |
| **Tiếp nhận dữ liệu** | AWS IoT Core nhận topic cảm biến; Adafruit IO MQTT làm bridge trong giai đoạn chuyển đổi |
| **Backend (control plane)** | EC2 chạy Node.js — subscribe MQTT, rule auto (quạt/đèn), forward lệnh, ghi DB |
| **Lưu trữ dữ liệu** | RDS (quan hệ) hoặc DynamoDB (NoSQL single-table: SENSOR, SETTINGS, CMD#, EVENT#) |
| **Giao diện web** | React dashboard trên S3 — giám sát realtime, điều khiển, Pomodoro, thông báo cửa |
| **Xác thực** | Cognito User Pool — giới hạn tài khoản thành viên nhóm lab |
| **Giám sát & chi phí** | CloudWatch logs/alarms; Budgets cảnh báo vượt ngưỡng |

### 4. Triển khai kỹ thuật

#### Các giai đoạn triển khai

Dự án gồm 2 phần — **firmware/thiết bị ESP32** và **nền tảng cloud SmartHome_IoT** — mỗi phần trải qua 4 giai đoạn trong kỳ thực tập 8 tuần:

| Giai đoạn | Nội dung | Thời gian |
| --------- | -------- | --------- |
| **Nghiên cứu & kiến trúc** | Phân tích repo (`frontend`, `backend`, `code/`), thiết kế kiến trúc AWS, schema DB | Tuần 1, 6 |
| **Tính toán chi phí & khả thi** | AWS Pricing Calculator, Free Tier, Budgets; kiểm tra tính khả thi lab | Tuần 2 |
| **Điều chỉnh kiến trúc** | Tối ưu VPC/EC2/RDS, IAM Role thay static key, chọn RDS vs DynamoDB | Tuần 3–5 |
| **Phát triển, kiểm thử, triển khai** | Tích hợp module, deploy EC2/S3/RDS, test E2E, demo, báo cáo | Tuần 6–8 |

#### Yêu cầu kỹ thuật

**Thiết bị ESP32**

- Cảm biến: nhiệt độ, độ ẩm (DHT), ánh sáng, khoảng cách cửa (ultrasonic/simulated).
- Actuator: relay đèn, quạt; hỗ trợ lệnh Pomodoro.
- Firmware Arduino/PlatformIO; giao tiếp MQTT qua Adafruit IO hoặc AWS IoT Core.
- Ước tính ~1–5 MB/ngày/thiết bị (tùy tần suất publish).

**Nền tảng cloud**

- **VPC + EC2 + IAM Role**: host backend Node.js, Security Group mở port API/SSH.
- **RDS** (MySQL/PostgreSQL lab) hoặc **DynamoDB** (single-table, pay-per-request).
- **S3**: build React/Vite, static hosting hoặc CloudFront (tuỳ chọn).
- **IoT Core**: Thing, certificate, policy; topic prefix `smarthome/`.
- **Cognito**: User Pool cho 3–5 thành viên nhóm.
- **Lambda + API Gateway**: API serverless bổ sung (tuần 7 — học và tích hợp nếu phù hợp).
- **CloudWatch + Budgets + AWS CLI**: giám sát, cảnh báo, deploy tự động.

### 5. Lộ trình & Mốc triển khai

| Giai đoạn | Mốc | Nội dung |
| --------- | --- | -------- |
| **Tuần 1** | Onboarding | Làm quen văn phòng, nội quy, yêu cầu pass; lập nhóm; chọn SmartHome_IoT; roadmap 8 tuần |
| **Tuần 2–5** | Nền tảng AWS | Tài khoản, Budgets, CLI, IAM, VPC, EC2, IAM Roles |
| **Tuần 6** | Kiến trúc & DB | S3, RDS, CloudWatch; hoàn thiện kiến trúc; thiết kế schema DB |
| **Tuần 7** | Tích hợp module | DynamoDB, Lambda, API Gateway, Cognito; tích hợp backend–frontend–MQTT |
| **Tuần 8** | Hoàn thiện & báo cáo | Fix bug, test E2E trên AWS, demo, tài liệu workshop song ngữ, cleanup resource |
| **Sau triển khai** | Mở rộng | Thêm ESP32, migrate frontend sang Cognito/API, mở rộng automation rules |

### 6. Ước tính ngân sách

> Chi tiết có thể xem trên [AWS Pricing Calculator](https://calculator.aws/).  
> Lab sử dụng Free Tier và **tắt EC2/RDS khi không demo** để giữ chi phí thấp.

#### Chi phí hạ tầng (lab, ~1 thiết bị ESP32)

| Hạng mục | Chi phí/tháng |
| -------- | -------------- |
| Amazon EC2 (t3.micro, ~160 giờ/tháng) | 0,00 USD (Free Tier) hoặc ~0,50 USD |
| Amazon RDS (db.t3.micro, ~160 giờ/tháng) | 0,00 USD (Free Tier) hoặc ~0,40 USD |
| Amazon S3 Standard (1 GB, ~500 request) | 0,05 USD |
| AWS IoT Core (1 thiết bị, ~10.000 message) | 0,02 USD |
| AWS Lambda (500 request, 256 MB) | 0,00 USD |
| Amazon API Gateway (1.000 request) | 0,01 USD |
| Amazon Cognito (≤5 user, MAU thấp) | 0,00 USD |
| Amazon CloudWatch (logs + 1 alarm) | 0,10 USD |
| Truyền dữ liệu | 0,02 USD |
| **Tổng** | **~1,20 USD/tháng · ~14,40 USD/12 tháng** |

#### Phần cứng (một lần)

| Hạng mục | Chi phí |
| -------- | ------- |
| ESP32 DevKit + cảm biến DHT, LDR, relay, dây/jumper | ~30–50 USD/bộ |
| (Tuỳ chọn) Breadboard, nguồn 5V | ~10 USD |

### 7. Đánh giá rủi ro

#### Ma trận rủi ro

| Rủi ro | Ảnh hưởng | Xác suất |
| ------ | --------- | -------- |
| Mất mạng Wi-Fi / MQTT disconnect | Trung bình | Trung bình |
| Sai cấu hình IoT cert/policy | Cao | Trung bình |
| Hỏng cảm biến ESP32 | Trung bình | Thấp |
| Quên tắt EC2/RDS → vượt ngân sách | Trung bình | Trung bình |
| Lộ credential trong git | Cao | Thấp |

#### Chiến lược giảm thiểu

| Rủi ro | Giảm thiểu |
| ------ | ----------- |
| Mạng | ESP32 reconnect MQTT; backend buffer/log lỗi; CloudWatch alarm |
| IoT cert/policy | Checklist policy trước deploy; test publish/subscribe từng topic |
| Cảm biến | Kiểm tra định kỳ; mock data trên backend khi thiếu thiết bị |
| Chi phí | **AWS Budgets** cảnh báo; checklist stop EC2/RDS sau demo |
| Credential | **IAM Role for EC2**; `.env` + `.gitignore`; không commit key |

#### Kế hoạch dự phòng

- Chạy backend local (`npm start`) nếu EC2 gặp sự cố tạm thời.
- Dùng `server.firebase.js` (backup) khi migration AWS chưa hoàn tất.
- CloudFormation/Terraform template (tuỳ chọn) để khôi phục cấu hình lab nhanh.

### 8. Kết quả kỳ vọng

#### Cải tiến kỹ thuật

- Dashboard giám sát và điều khiển **thời gian thực** thay thế server cục bộ / Firebase phân mảnh.
- Kiến trúc AWS thống nhất: VPC, EC2 + IAM Role, IoT Core, RDS/S3, Cognito, CloudWatch.
- Module firmware, backend, frontend **tích hợp end-to-end**; có thể mở rộng thêm ESP32 và automation rules.

#### Giá trị dài hạn

- Codebase và tài liệu workshop song ngữ (VI/EN) tái sử dụng cho intern khoá sau.
- Nền tảng lab IoT nhỏ gọn, chi phí thấp, phù hợp demo và nghiên cứu thêm (AI/analytics trên dữ liệu cảm biến).
- Kinh nghiệm thực hành AWS đầy đủ — từ account setup đến deploy, giám sát và cleanup — đáp ứng yêu cầu kỳ thực tập FCAJ.
