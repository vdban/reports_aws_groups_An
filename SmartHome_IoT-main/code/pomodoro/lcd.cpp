#include "lcd.h"
#include "../sensors/sensors.h"
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <math.h>

static LiquidCrystal_I2C lcd(0x27, 16, 2);

void lcdInit() {
    Wire.begin(11, 12);
    lcd.init();
    lcd.backlight();
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(" SMART POMODORO "); // 16 ký tự
    lcd.setCursor(0, 1);
    lcd.print(" Send START ->  "); // LCD chỉ có 16 ký tự mỗi dòng
}

void lcdShowSensors() {
    lcd.clear();
    lcd.setCursor(0, 0);
    if (!isnan(v_temp)) {
        char line0[17];
        snprintf(line0, sizeof(line0), "T:%4.1fC L:%4d", v_temp, v_lux);
        lcd.print(line0);
    } else {
        lcd.print("T:--.-C L:----");
    }

    lcd.setCursor(0, 1);
    if (!isnan(v_humi)) {
        char line1[17];
        snprintf(line1, sizeof(line1), "H:%4.1f%% Door:%s", v_humi, v_doorOpen ? "OP" : "CL");
        lcd.print(line1);
    } else {
        lcd.print("H:--.-% Door:--");
    }
}

void lcdShowPomodoro(int minLeft, int secLeft, bool isWork) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(isWork ? "  FOCUS TIME   " : "  BREAK TIME   ");
    lcd.setCursor(0, 1);
    char buf[17];
    snprintf(buf, sizeof(buf), "     %02d:%02d     ", minLeft, secLeft);
    lcd.print(buf);
}

void lcdShowDoorAlert() {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("!! DOOR OPEN !!");
    lcd.setCursor(0, 1);
    lcd.print("Check the door ");
}

void lcdClear() {
    lcd.clear();
}
