/**
 * IoT_Lab_ESP32.ino - Phiên bản C++ (Arduino sketch) chạy trực tiếp trên Yolo
 * UNO (ESP32)
 *
 * Phiên bản này giúp chuyển đổi hoàn toàn mô hình từ "Chạy qua Gateway Python"
 * sang "Chạy trực tiếp độc lập trên ESP32". Yolo UNO sẽ tự kết nối Wi-Fi, kết
 * nối trực tiếp tới Adafruit IO MQTT Broker, tự chạy bộ đếm Pomodoro bằng Class
 * PomodoroTimer C++ và cập nhật màn hình LCD cùng với việc đẩy thông số nhiệt
 * độ lên MQTT.
 */

#include <WiFiClientSecure.h>
#include "PubSubClient.h"
#include "LiquidCrystal_I2C.h"
#include <WiFi.h>
#include <Wire.h>

// Nhúng Class Pomodoro C++ dùng chung
#include "../pomodoro/pomodoro.h"
#include "../pomodoro/pomodoro.cpp"

// Định nghĩa chân đọc cảm biến ánh sáng LDR
#define PIN_LDR 1 

// Định nghĩa chân điều khiển Đèn LED Xanh lá (Kết nối chân D10 / GPIO 21)
#define PIN_GREEN_LED 21

// --- CẤU HÌNH CẢM BIẾN NHIỆT ĐỘ DHT11 ---
#include "DHT.h"
// Lỗ cắm số 5 trên dãy Header của Yolo UNO chính là GPIO 8
#define PIN_DHT 8
#define DHTTYPE DHT11
DHT dht(PIN_DHT, DHTTYPE);

// --- CẤU HÌNH QUẠT (STEPPER & SERVO) ---
#include <Stepper.h>
const int stepsPerRevolution = 2048;
// Chân IN1(D6=9), IN3(D8=17), IN2(D7=10), IN4(D9=18)
Stepper myStepper(stepsPerRevolution, 9, 17, 10, 18);

const int servoPin = 5; // D2 = GPIO5
const int servoChannel = 2;
int servoAngle = 90;
int servoDir = 1;
unsigned long lastServoUpdate = 0;
bool isFanOn = false;

void setServoAngle(int angle) {
  int dutyCycle = map(angle, 0, 180, 410, 2048);
  ledcWrite(servoPin, dutyCycle);
}

void setupServo() {
  ledcAttach(servoPin, 50, 14); // 50 Hz, 14-bit resolution (ESP32 Core 3.x)
  setServoAngle(90);
}


// =========================================================================
// CẤU HÌNH PHƯƠNG THỨC HOẠT ĐỘNG
// Mở comment dòng dưới đây nếu muốn chạy ONLINE (Kết nối Wi-Fi và Adafruit IO
// MQTT) Đóng comment dòng dưới đây nếu muốn chạy OFFLINE (Chạy offline cục bộ
// qua LCD, không cần Wi-Fi)
// =========================================================================
#define USE_WIFI_AND_MQTT

// Các biến cấu hình thời gian Pomodoro toàn cục
int pomoWorkSec = 25 * 60;
int pomoBreakSec = 5 * 60;

// --- KHỞI TẠO MÀN HÌNH LCD 1602 DÙNG RIÊNG CHO SKETCH ---
static LiquidCrystal_I2C lcd(0x27, 16, 2);

void lcdInit() {
  Wire.begin(); // Sử dụng I2C mặc định của Yolo UNO
  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(" Smart Pomodoro ");
  lcd.setCursor(0, 1);
  lcd.print("  Initializing  ");
}

void lcdShowPomodoro(int minLeft, int secLeft, const String& state) {
  lcd.clear();
  lcd.setCursor(0, 0);
  if (state == "FOCUS") {
    lcd.print("  FOCUS TIME   ");
  } else if (state == "BREAK") {
    lcd.print("  BREAK TIME   ");
  } else {
    lcd.print("    STANDBY    ");
  }
  lcd.setCursor(0, 1);
  char buf[17];
  snprintf(buf, sizeof(buf), "     %02d:%02d     ", minLeft, secLeft);
  lcd.print(buf);
}

#include "../secrets.h"

#ifdef USE_WIFI_AND_MQTT
// --- CẤU HÌNH WI-FI ---
#define WLAN_SSID SECRET_WLAN_SSID // Tên Wi-Fi của bạn
#define WLAN_PASS SECRET_WLAN_PASS // Mật khẩu Wi-Fi của bạn

// --- KHỞI TẠO ĐỐI TƯỢNG HỆ THỐNG AWS IoT ---
WiFiClientSecure net;
PubSubClient mqtt(net);

// Các Topics MQTT:
#define TOPIC_POMO_CONTROL "device/pomodoro-control"
#define TOPIC_LED          "device/bbc-led"
#define TOPIC_TEMP_REQ     "device/bbc-temp-req"
#define TOPIC_FAN          "device/bbc-fan"
#define TOPIC_POMO_STATUS  "device/pomodoro-status"
#define TOPIC_TEMP         "device/bbc-temp"
#define TOPIC_HUMI         "device/bbc-humi"
#define TOPIC_LIGHT        "device/bbc-light"

// Khai báo hàm callback xử lý tin nhắn MQTT
void messageHandler(char* topic, byte* payload, unsigned int length);
#endif

// Biến điều khiển gửi nhiệt độ ngẫu nhiên và LDR
unsigned long lastTempUpdate = 0;
unsigned long lastLdrUpdate = 0;

#ifdef USE_WIFI_AND_MQTT
// Hàm kết nối MQTT Broker
void MQTT_connect();

// Callback của Pomodoro gửi thông báo trạng thái lên AWS IoT
void publishStatus(const String &statusStr) {
  Serial.println("[MQTT] Gửi trạng thái: " + statusStr);
  mqtt.publish(TOPIC_POMO_STATUS, statusStr.c_str());
}
#else
// Bỏ qua gửi MQTT khi offline
void publishStatus(const String &statusStr) {
  Serial.println("[POMODORO PUB] " + statusStr);
}
#endif

// Callback của Pomodoro cập nhật LCD phần cứng
void hardwareControl(const String &state, const String &timeStr) {
  int mins = 0, secs = 0;
  int colonIdx = timeStr.indexOf(':');
  if (colonIdx != -1) {
    mins = timeStr.substring(0, colonIdx).toInt();
    secs = timeStr.substring(colonIdx + 1).toInt();
  }
  lcdShowPomodoro(mins, secs, state);
}

void setup() {
  Serial.begin(115200);
  delay(10);

  // Cấu hình chân Đèn LED Xanh lá làm Output
  pinMode(PIN_GREEN_LED, OUTPUT);
  digitalWrite(PIN_GREEN_LED, LOW);

  // Khởi động cảm biến DHT11
  dht.begin();

  // Khởi tạo Quạt
  myStepper.setSpeed(15);
  setupServo();

  // 1. Khởi tạo LCD 1602
  lcdInit();

#ifdef USE_WIFI_AND_MQTT
  Serial.println("Đang kết nối Wi-Fi...");

  // 2. Bắt đầu kết nối Wi-Fi
  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // 3. Cấu hình chứng chỉ AWS IoT Core
  net.setCACert(AWS_CA);
  net.setCertificate(AWS_CERT);
  net.setPrivateKey(AWS_KEY);
  
  // Cấu hình MQTT Broker
  mqtt.setServer(AWS_ENDPOINT, 8883);
  mqtt.setCallback(messageHandler);
#else
  Serial.println("CHẾ ĐỘ OFFLINE: Đã bỏ qua kết nối Wi-Fi & MQTT!");
#endif

  // 4. Khởi tạo lớp đếm giờ Pomodoro
  pomodoroTimer.init(publishStatus, hardwareControl);

  // Đưa LCD về trạng thái chờ ban đầu
  hardwareControl("IDLE", "00:00");
}

void loop() {
#ifdef USE_WIFI_AND_MQTT
  // Đảm bảo kết nối MQTT ổn định
  MQTT_connect();

  // 1. Giữ kết nối và đọc lệnh MQTT (non-blocking)
  mqtt.loop();
#endif

  // 2. Chạy đếm giờ Pomodoro liên tục
  pomodoroTimer.update();

  // 2.1 Cập nhật Quạt liên tục nếu đang bật
  if (isFanOn) {
    myStepper.step(10);
    unsigned long currentMillis = millis();
    if (currentMillis - lastServoUpdate >= 20) {
      lastServoUpdate = currentMillis;
      servoAngle += servoDir;
      if (servoAngle >= 150) {
        servoDir = -1;
      } else if (servoAngle <= 30) {
        servoDir = 1;
      }
      setServoAngle(servoAngle);
    }
  }

#ifdef USE_WIFI_AND_MQTT
  // 3. Đẩy nhiệt độ và độ ẩm từ DHT11 lên MQTT mỗi 30 giây (non-blocking)
  unsigned long currentMillis = millis();
  if (currentMillis - lastTempUpdate >= 30000) {
    float t = dht.readTemperature();
    float h = dht.readHumidity();
    if (!isnan(t) && !isnan(h)) {
      int tempVal = (int)t; // Làm tròn để gửi lên Dashboard
      int humVal = (int)h;
      Serial.printf("Cập nhật định kỳ - Nhiệt độ: %d°C | Độ ẩm: %d%%\n", tempVal, humVal);
      mqtt.publish(TOPIC_TEMP, String(tempVal).c_str());
      mqtt.publish(TOPIC_HUMI, String(humVal).c_str());
    } else {
      Serial.println("Lỗi: Không đọc được dữ liệu từ DHT11!");
    }
    lastTempUpdate = currentMillis;
  }

  // 4. Đọc LDR và đẩy lên MQTT mỗi 15 giây (non-blocking)
  if (currentMillis - lastLdrUpdate >= 15000) {
    int ldrRaw = analogRead(PIN_LDR);
    int lightPercent = map(ldrRaw, 0, 4095, 0, 100);
    Serial.printf("LDR Raw: %d | Cuong do sang: %d%%\n", ldrRaw, lightPercent);
    mqtt.publish(TOPIC_LIGHT, String(lightPercent).c_str());
    lastLdrUpdate = currentMillis;
  }
#endif

  delay(10); // Sleep nhẹ để ổn định luồng chạy vi điều khiển
}

#ifdef USE_WIFI_AND_MQTT
// Hàm callback xử lý tin nhắn MQTT
void messageHandler(char* topic, byte* payload, unsigned int length) {
  String message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  message.trim();
  String top = String(topic);

  if (top == TOPIC_POMO_CONTROL) {
    Serial.println("--> Nhận lệnh Pomodoro từ AWS: " + message);
    pomodoroTimer.handleCommand(message);
  } else if (top == TOPIC_LED) {
    Serial.println("--> Nhận lệnh Đèn từ AWS: " + message);
    if (message == "1") {
      digitalWrite(PIN_GREEN_LED, HIGH);
      Serial.println("💡 BAT DEN XANH LA");
    } else if (message == "0") {
      digitalWrite(PIN_GREEN_LED, LOW);
      Serial.println("💡 TAT DEN XANH LA");
    }
  } else if (top == TOPIC_TEMP_REQ) {
    Serial.println("--> Nhận lệnh Yêu cầu đo nhiệt độ/độ ẩm ngay lập tức!");
    float t = dht.readTemperature();
    float h = dht.readHumidity();
    if (!isnan(t) && !isnan(h)) {
      int tempVal = (int)t;
      int humVal = (int)h;
      Serial.printf("Cập nhật tức thời - Nhiệt độ: %d°C | Độ ẩm: %d%%\n", tempVal, humVal);
      mqtt.publish(TOPIC_TEMP, String(tempVal).c_str());
      mqtt.publish(TOPIC_HUMI, String(humVal).c_str());
    } else {
      Serial.println("Lỗi: Không đọc được dữ liệu từ DHT11!");
    }
  } else if (top == TOPIC_FAN) {
    Serial.println("--> Nhận lệnh Quạt từ AWS: " + message);
    if (message == "1") {
      isFanOn = true;
      Serial.println("🌀 BAT QUAT");
    } else if (message == "0") {
      isFanOn = false;
      Serial.println("🌀 TAT QUAT");
    }
  }
}

// Hàm kết nối MQTT và tự động kết nối lại
void MQTT_connect() {
  if (mqtt.connected()) {
    return;
  }

  Serial.println("Dang ket noi AWS IoT Core...");
  uint8_t retries = 3;
  while (!mqtt.connect(CLIENT_ID)) {
    Serial.print("Thất bại, mã lỗi=");
    Serial.print(mqtt.state());
    Serial.println(". Thử lại kết nối MQTT sau 5 giây...");
    delay(5000);
    retries--;
    if (retries == 0) {
      Serial.println(
          "Kết nối MQTT thất bại quá nhiều lần! Đang reset ESP32...");
      delay(1000);
      ESP.restart();
    }
  }
  Serial.println("AWS IoT Connected!");
  
  // Đăng ký lại các Topics sau khi kết nối thành công
  mqtt.subscribe(TOPIC_POMO_CONTROL);
  mqtt.subscribe(TOPIC_LED);
  mqtt.subscribe(TOPIC_TEMP_REQ);
  mqtt.subscribe(TOPIC_FAN);
}
#endif
