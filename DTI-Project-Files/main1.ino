#include <WiFi.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <time.h>

#define BUTTON_PIN 4
#define NTP_SERVER "time.google.com"  // Reliable NTP server
#define UTC_OFFSET 19800              // India Time (UTC+5:30)
#define UTC_OFFSET_DST 0

LiquidCrystal_I2C lcd(0x27, 16, 2);

enum State { RUNNING, SHUTDOWN };
State currentState = RUNNING;

struct tm startTime;
struct tm shutdownTime;

unsigned long lastUpdate = 0;
bool buttonPressed = false;

void setup() {
  Serial.begin(115200);
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Connecting WiFi");

  WiFi.begin("Wokwi-GUEST", "", 6);
  unsigned long startAttempt = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - startAttempt < 10000) {
    delay(200);
    lcd.print(".");
  }

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("WiFi Connected");

  configTime(UTC_OFFSET, UTC_OFFSET_DST, NTP_SERVER);

  // NTP sync wait loop
  struct tm timeinfo;
  int retry = 0;
  bool timeSynced = false;

  while (retry < 10) {
    if (getLocalTime(&timeinfo)) {
      timeSynced = true;
      break;
    }
    Serial.println("⏳ Waiting for NTP...");
    delay(500);
    retry++;
  }

  if (!timeSynced) {
    Serial.println("⚠️ NTP sync failed. Will use system time.");
  }

  getBootTime();
  updateTimeDisplay(); // show initial time
  Serial.println("✅ Boot complete.");
}

void loop() {
  if (currentState == RUNNING) {
    unsigned long now = millis();
    if (now - lastUpdate > 1000) {
      updateTimeDisplay();
      lastUpdate = now;
    }
  }

  checkButton();
}

void getBootTime() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("⚠️ NTP Failed in getBootTime(). Using system time.");
    time_t rawTime = time(nullptr);
    localtime_r(&rawTime, &startTime);
  } else {
    startTime = timeinfo;
  }

  char buf[20];
  strftime(buf, sizeof(buf), "%d/%m %H:%M:%S", &startTime);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Boot:");
  lcd.setCursor(0, 1);
  lcd.print(buf);

  Serial.print("🟢 Started at: ");
  Serial.println(buf);
}

void updateTimeDisplay() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) return;

  char buf[16];
  strftime(buf, sizeof(buf), "%H:%M:%S", &timeinfo);
  lcd.setCursor(0, 0);
  lcd.print("Time: ");
  lcd.print(buf);
  lcd.print("   ");  // Padding to clear leftovers

  strftime(buf, sizeof(buf), "%d/%m/%y", &timeinfo);
  lcd.setCursor(0, 1);
  lcd.print("Date: ");
  lcd.print(buf);
  lcd.print("   ");
}

void showShutdownInfo() {
  time_t nowRaw = time(nullptr);
  localtime_r(&nowRaw, &shutdownTime);

  time_t startEpoch = mktime(&startTime);
  time_t endEpoch = nowRaw;
  int duration = endEpoch - startEpoch;

  int hours = duration / 3600;
  int minutes = (duration % 3600) / 60;
  int seconds = duration % 60;

  char shutBuf[16];
  strftime(shutBuf, sizeof(shutBuf), "%H:%M:%S", &shutdownTime);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Shutdown:");
  lcd.setCursor(0, 1);
  lcd.print(shutBuf);

  Serial.println("🛑 Shutdown");
  Serial.print("Time: ");
  Serial.println(shutBuf);
  Serial.printf("⏱ Uptime: %02d:%02d:%02d\n", hours, minutes, seconds);
}

void checkButton() {
  static bool lastState = HIGH;
  bool currentStateBtn = digitalRead(BUTTON_PIN);

  if (lastState == HIGH && currentStateBtn == LOW) {
    delay(50); // debounce
    if (digitalRead(BUTTON_PIN) == LOW) {
      buttonPressed = true;
    }
  }

  if (buttonPressed) {
    if (currentState == RUNNING) {
      currentState = SHUTDOWN;
      showShutdownInfo();
    } else {
      currentState = RUNNING;
      getBootTime();  // reset to new start time
    }
    buttonPressed = false;
  }

  lastState = currentStateBtn;
}
