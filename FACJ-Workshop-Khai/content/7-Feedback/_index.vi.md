---
title: "Chia sẻ, đóng góp ý kiến"
date: 2026-07-01
weight: 7
chapter: false
pre: " <b> 7. </b> "
---

> Chia sẻ cá nhân sau **8 tuần** chương trình **First Cloud AI Journey (FCAJ)**, cùng nhóm triển khai **Smart Home IoT Platform (SmartHome_IoT)** trên AWS.

### Đánh giá chung

**1. Môi trường học tập & làm việc**

FCAJ kết hợp onboarding văn phòng, học AWS theo tuần và **dự án thật** — không chỉ lab rời rạc. Em thấy hữu ích khi được chuyển từ học **IAM, VPC, EC2, CLI** (tuần 2–5) sang **build & deploy SmartHome_IoT** (tuần 6–8): Dashboard React, backend Node.js trên **EC2 + Nginx**, **DynamoDB**, **Cognito**, **IoT Core**, stack **CloudFormation**, và báo cáo **Hugo trên Amplify**.



**2. Phù hợp mục tiêu cá nhân**

Trước kỳ thực tập, em quen web backend nhưng **AWS production** còn hạn chế. Sau 8 tuần, em đã trải qua full vòng: **IoT Core → MQTT → API → DynamoDB → Dashboard**, deploy bằng **CloudFormation + script**, demo qua `http://EC2_IP` với login **Cognito** và điều khiển thiết bị (đèn, quạt, cửa). Mục tiêu “học cloud qua dự án IoT” của em được đáp ứng rõ ràng.

**3. Cơ hội phát triển kỹ năng**

Dự án buộc em tư duy **xuyên suốt các lớp**:

```
ESP32 / Virtual ESP32 ──MQTT──► IoT Core ──► Backend EC2 ──► DynamoDB
                                      ▲              │
User (Browser) ──► Nginx (React + /api) ──► Cognito / CloudWatch
```

Em rèn thêm: thiết kế API, làm việc với **Infrastructure as Code**, viết **workshop / báo cáo** song ngữ, và phối hợp nhóm (frontend, nhúng, DevOps).


### Một số câu hỏi khác



### Góp ý thêm (tuỳ chọn)

Em mong chương trình tiếp tục duy trì **dự án nhóm end-to-end** thay vì chỉ cá nhân hóa từng lab — vì đó là phần em học được nhiều nhất. Phần **workshop Hugo + Amplify** cũng nên giữ để intern tập kỹ năng trình bày kỹ thuật cho người không chuyên.

### Tài liệu tham khảo

Chi tiết repo, link demo và danh sách dịch vụ AWS: [Tài liệu tham khảo](../8-references/).
