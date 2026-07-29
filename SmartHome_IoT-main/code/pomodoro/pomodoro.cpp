#include "pomodoro.h"
#include "lcd.h"
#include <Arduino.h>

// Định nghĩa biến trạng thái toàn cục
PomoState pomoState = POMO_IDLE;

// Định nghĩa instance toàn cục
PomodoroTimer pomodoroTimer;

// Hàm đồng bộ trạng thái nội bộ sang biến extern pomoState
static void syncPomoState(PomodoroTimer::State internalState) {
    switch (internalState) {
        case PomodoroTimer::STATE_FOCUS:
            pomoState = POMO_WORK;
            break;
        case PomodoroTimer::STATE_SHORT_BREAK:
        case PomodoroTimer::STATE_LONG_BREAK:
            pomoState = POMO_BREAK;
            break;
        case PomodoroTimer::STATE_IDLE:
        default:
            pomoState = POMO_IDLE;
            break;
    }
}

// ==========================================
// CÁC HÀM WRAPPER TOÀN CỤC CHO DỰ ÁN ESP32
// ==========================================

void pomodoroInit() {
    // Khởi tạo pomodoroTimer với các callback tiêu chuẩn
    pomodoroTimer.init(
        // Publish Callback: Gửi thông điệp lên serial và có thể gửi lên Firebase
        [](const String& statusStr) {
            Serial.println("[POMODORO PUB] " + statusStr);
            // Ở đây có thể tích hợp gửi dữ liệu lên Firebase/MQTT nếu cần
        },
        // Hardware Callback: Cập nhật màn hình LCD 1602
        [](const String& state, const String& timeStr) {
            int mins = 0, secs = 0;
            int colonIdx = timeStr.indexOf(':');
            if (colonIdx != -1) {
                mins = timeStr.substring(0, colonIdx).toInt();
                secs = timeStr.substring(colonIdx + 1).toInt();
            }
            // Gọi hàm hiển thị LCD đã có sẵn trong lcd.h/lcd.cpp
            lcdShowPomodoro(mins, secs, (state == "FOCUS"));
        }
    );
    syncPomoState(pomodoroTimer.getState());
}

void pomodoroUpdate() {
    pomodoroTimer.update();
    syncPomoState(pomodoroTimer.getState());
}

void pomodoroStart() {
    // Lấy thời gian focus cấu hình từ firebase (mặc định pomoWorkSec là 25 * 60)
    extern int pomoWorkSec;
    int workMin = pomoWorkSec / 60;
    if (workMin <= 0) workMin = 25; // Fallback nếu cấu hình không hợp lệ

    pomodoroTimer.handleCommand("START:" + String(workMin));
    syncPomoState(pomodoroTimer.getState());
}

void pomodoroStop() {
    pomodoroTimer.handleCommand("RESET");
    syncPomoState(pomodoroTimer.getState());
}

bool pomodoroIsWork() {
    return (pomodoroTimer.getState() == PomodoroTimer::STATE_FOCUS);
}

void pomodoroGetTimeLeft(int &minLeft, int &secLeft) {
    pomodoroTimer.getTimeLeft(minLeft, secLeft);
}

// ==========================================
// ĐỂ NGHỊ CHI TIẾT CLASS POMODOROTIMER
// ==========================================

PomodoroTimer::PomodoroTimer(PublishCallback pubCb, HardwareCallback hwCb) {
    init(pubCb, hwCb);
}

void PomodoroTimer::init(PublishCallback pubCb, HardwareCallback hwCb) {
    _currentState = STATE_IDLE;
    _startTime = 0;
    _duration = 0;
    _focusCycles = 0;
    _lastPublishTime = 0;
    _focusDurationMinutes = 1; // 1 phút mặc định để kiểm tra giống pomodoro.py
    
    _isPaused = false;
    _pausedTimeLeft = 0;

    _publishCallback = pubCb;
    _hardwareCallback = hwCb;
}

void PomodoroTimer::_setState(State newState) {
    _currentState = newState;
    syncPomoState(newState);
    if (_hardwareCallback) {
        String stateStr = "IDLE";
        if (_currentState == STATE_FOCUS) stateStr = "FOCUS";
        else if (_currentState == STATE_SHORT_BREAK) stateStr = "SHORT_BREAK";
        else if (_currentState == STATE_LONG_BREAK) stateStr = "LONG_BREAK";
        
        _hardwareCallback(stateStr, "00:00");
    }
}

void PomodoroTimer::handleCommand(const String& payload) {
    // 1. Kiểm tra nếu payload là một con số (thiết lập thời gian focus tạm thời qua slider)
    bool isNumeric = (payload.length() > 0);
    for (unsigned int i = 0; i < payload.length(); i++) {
        if (!isDigit(payload.charAt(i))) {
            isNumeric = false;
            break;
        }
    }

    if (isNumeric) {
        _focusDurationMinutes = payload.toInt();
        Serial.printf("*** ĐÃ SET THỜI GIAN FOCUS TẠM THỜI: %d PHÚT ***\n", _focusDurationMinutes);
        if (_currentState == STATE_IDLE) {
            if (_publishCallback) {
                _publishCallback("Thời gian FOCUS: " + String(_focusDurationMinutes) + "m.");
            }
        }
        return; // Chỉ lưu thời gian, chưa bắt đầu chạy
    }

    // 2. Nhận lệnh START (ví dụ: "START" hoặc "START:30")
    if (payload.startsWith("START") && _currentState == STATE_IDLE) {
        int colonIdx = payload.indexOf(':');
        if (colonIdx != -1) {
            int customMin = payload.substring(colonIdx + 1).toInt();
            if (customMin > 0) {
                _focusDurationMinutes = customMin;
            }
        }

        _setState(STATE_FOCUS);
        _duration = _focusDurationMinutes * 60;
        _startTime = millis() / 1000;
        
        Serial.printf("*** BẮT ĐẦU CHU KỲ FOCUS (%d PHÚT) ***\n", _focusDurationMinutes);
        if (_publishCallback) {
            _publishCallback("Bắt đầu: FOCUS (" + String(_focusDurationMinutes) + "m)");
        }
    }
    // 3. Nhận lệnh RESET
    else if (payload == "RESET") {
        _setState(STATE_IDLE);
        _focusCycles = 0;
        _isPaused = false;
        if (_publishCallback) {
            _publishCallback("ĐÃ RESET");
        }
        Serial.println("*** ĐÃ RESET VỀ CHẾ ĐỘ CHỜ ***");
    }
    // 4. Nhận lệnh PAUSE
    else if (payload == "PAUSE" && _currentState != STATE_IDLE && !_isPaused) {
        _isPaused = true;
        unsigned long currentTime = millis() / 1000;
        unsigned long elapsed = currentTime - _startTime;
        _pausedTimeLeft = (_duration > elapsed) ? (_duration - elapsed) : 0;
        
        if (_hardwareCallback) {
            _hardwareCallback("PAUSED", " --:-- ");
        }
        if (_publishCallback) {
            _publishCallback("ĐÃ TẠM DỪNG");
        }
        Serial.println("*** ĐÃ TẠM DỪNG ***");
    }
    // 5. Nhận lệnh RESUME
    else if (payload == "RESUME" && _currentState != STATE_IDLE && _isPaused) {
        _isPaused = false;
        _startTime = (millis() / 1000) - (_duration - _pausedTimeLeft);
        
        if (_publishCallback) {
            _publishCallback("ĐÃ TIẾP TỤC");
        }
        Serial.println("*** ĐÃ TIẾP TỤC ***");
    }
}

void PomodoroTimer::update() {
    if (_currentState == STATE_IDLE) {
        return; // Đang ở trạng thái chờ, không làm gì cả
    }
    if (_isPaused) {
        return; // Đang tạm dừng, không cập nhật đếm ngược
    }

    unsigned long currentTime = millis() / 1000;
    unsigned long elapsed = currentTime - _startTime;
    long timeLeft = (long)_duration - (long)elapsed;

    // 1. Khi hết thời gian chu kỳ hiện tại
    if (timeLeft <= 0) {
        if (_currentState == STATE_FOCUS) {
            _focusCycles++;
            if (_focusCycles % 4 == 0) {
                _setState(STATE_LONG_BREAK);
                // Nghỉ dài tỷ lệ thuận, tối thiểu 60 giây (1 phút)
                long newDuration = _focusDurationMinutes * 60 * 3 / 5;
                _duration = (newDuration > 60) ? newDuration : 60;
            } else {
                _setState(STATE_SHORT_BREAK);
                // Nghỉ ngắn tỷ lệ thuận, tối thiểu 30 giây
                long newDuration = _focusDurationMinutes * 60 / 5;
                _duration = (newDuration > 30) ? newDuration : 30;
            }
        } else if (_currentState == STATE_SHORT_BREAK || _currentState == STATE_LONG_BREAK) {
            _setState(STATE_IDLE);
        }

        _startTime = millis() / 1000;

        if (_currentState != STATE_IDLE) {
            String stateStr = "";
            if (_currentState == STATE_FOCUS) stateStr = "FOCUS";
            else if (_currentState == STATE_SHORT_BREAK) stateStr = "SHORT_BREAK";
            else if (_currentState == STATE_LONG_BREAK) stateStr = "LONG_BREAK";
            
            if (_publishCallback) {
                _publishCallback("Bắt đầu: " + stateStr);
            }
        } else {
            if (_publishCallback) {
                _publishCallback("HOÀN THÀNH!");
            }
        }
    }
    // 2. Chưa hết giờ -> Cập nhật LCD mỗi 1 giây & publish lên Dashboard mỗi 5 giây
    else {
        int mins = timeLeft / 60;
        int secs = timeLeft % 60;
        
        char timeStr[6];
        snprintf(timeStr, sizeof(timeStr), "%02d:%02d", mins, secs);

        // Thêm biến static để tránh spam gửi tín hiệu ra LCD liên tục gây lỗi hiển thị
        static int lastSecs = -1;
        if (secs != lastSecs) {
            lastSecs = secs;

            // Gửi tín hiệu cập nhật phần cứng
            if (_hardwareCallback) {
                String stateStr = "";
                if (_currentState == STATE_FOCUS) stateStr = "FOCUS";
                else if (_currentState == STATE_SHORT_BREAK) stateStr = "SHORT_BREAK";
                else if (_currentState == STATE_LONG_BREAK) stateStr = "LONG_BREAK";
                
                _hardwareCallback(stateStr, String(timeStr));
            }
        }

        // Đồng bộ dữ liệu lên Dashboard mỗi 5 giây
        if (currentTime - _lastPublishTime >= 5) {
            String stateStr = "";
            if (_currentState == STATE_FOCUS) stateStr = "FOCUS";
            else if (_currentState == STATE_SHORT_BREAK) stateStr = "SHORT_BREAK";
            else if (_currentState == STATE_LONG_BREAK) stateStr = "LONG_BREAK";

            String statusStr = stateStr + " - " + String(timeStr);
            Serial.println("Cập nhật: " + statusStr);
            if (_publishCallback) {
                _publishCallback(statusStr);
            }
            _lastPublishTime = currentTime;
        }
    }
}

void PomodoroTimer::getTimeLeft(int &mins, int &secs) const {
    if (_currentState == STATE_IDLE) {
        mins = 0;
        secs = 0;
        return;
    }
    long timeLeft;
    if (_isPaused) {
        timeLeft = _pausedTimeLeft;
    } else {
        unsigned long currentTime = millis() / 1000;
        unsigned long elapsed = currentTime - _startTime;
        timeLeft = (long)_duration - (long)elapsed;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }
    mins = timeLeft / 60;
    secs = timeLeft % 60;
}
