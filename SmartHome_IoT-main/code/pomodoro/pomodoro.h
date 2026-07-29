#pragma once
#include <Arduino.h>

// Định nghĩa các trạng thái Pomodoro dùng cho Firebase và phone_dock
enum PomoState {
    POMO_IDLE,
    POMO_WORK,
    POMO_BREAK
};

// Biến trạng thái toàn cục được sử dụng bởi firebase.cpp và phone_dock.cpp
extern PomoState pomoState;

// Các hàm toàn cục dùng để điều khiển và lấy trạng thái Pomodoro
void pomodoroInit();
void pomodoroUpdate();
void pomodoroStart();
void pomodoroStop();
bool pomodoroIsWork();
void pomodoroGetTimeLeft(int &minLeft, int &secLeft);

// Class PomodoroTimer mô phỏng chính xác cấu trúc OOP của pomodoro.py
class PomodoroTimer {
public:
    enum State {
        STATE_IDLE,
        STATE_FOCUS,
        STATE_SHORT_BREAK,
        STATE_LONG_BREAK
    };

    typedef void (*PublishCallback)(const String&);
    typedef void (*HardwareCallback)(const String&, const String&);

    // Constructor mặc định
    PomodoroTimer(PublishCallback pubCb = nullptr, HardwareCallback hwCb = nullptr);

    // Hàm khởi tạo callback
    void init(PublishCallback pubCb, HardwareCallback hwCb);

    // Xử lý các lệnh gửi từ Dashboard (START, START:duration, RESET, slider...)
    void handleCommand(const String& payload);

    // Hàm cập nhật thời gian liên tục (gọi trong loop)
    void update();

    // Các hàm getter
    State getState() const { return _currentState; }
    int getFocusCycles() const { return _focusCycles; }
    int getFocusDurationMinutes() const { return _focusDurationMinutes; }
    void getTimeLeft(int &mins, int &secs) const;

private:
    void _setState(State newState);

    State _currentState;
    unsigned long _startTime;             // Lưu thời gian bắt đầu (giây)
    unsigned long _duration;              // Thời lượng chu kỳ hiện tại (giây)
    int _focusCycles;                     // Số chu kỳ focus đã hoàn thành
    unsigned long _lastPublishTime;       // Lưu thời điểm publish gần nhất
    int _focusDurationMinutes;            // Thời gian focus mặc định (phút)

    bool _isPaused;                       // Trạng thái tạm dừng
    unsigned long _pausedTimeLeft;        // Lưu số giây còn lại khi tạm dừng

    PublishCallback _publishCallback;
    HardwareCallback _hardwareCallback;
};

// Khai báo instance toàn cục của class PomodoroTimer
extern PomodoroTimer pomodoroTimer;
