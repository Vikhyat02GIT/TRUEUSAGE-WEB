

__      __           _          _              ___            __ _                   
\ \    / / ___  _ _ | |__      (_) _ _        | _ \ _ _  ___ / _` | _ _  ___  ___ ___
 \ \/\/ / / _ \| '_|| / /      | || ' \       |  _/| '_|/ _ \\__. || '_|/ -_)(_-/(_-/
  \_/\_/  \___/|_|  |_\_\      |_||_||_|      |_|  |_|  \___/|___/ |_|  \___|/__//__/




#include <WiFi.h>
#include <TimeLib.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <EEPROM.h>

#define EEPROM_SIZE 64
#define ADDR_FLAG 0
#define ADDR_TIMESTAMP 1

LiquidCrystal_I2C LCD(0x27, 16, 2);

#define NTP_SERVER     "pool.ntp.org"
#define UTC_OFFSET     19800
#define UTC_OFFSET_DST 0

void spinner() {
  static int8_t counter = 0;
  const char* glyphs = "\xa1\xa5\xdb";
  LCD.setCursor(15, 1);
  LCD.print(glyphs[counter++]);
  if (counter == strlen(glyphs)) {
    counter = 0;
  }
}

void printLocalTime() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    LCD.setCursor(0, 1);
    LCD.println("Connection Err");
    return;
  }

  LCD.setCursor(8, 0);
  LCD.println(&timeinfo, "%H:%M:%S");

  LCD.setCursor(0, 1);
  LCD.println(&timeinfo, "%d/%m/%Y   %Z");
}

void storeFirstBootTime(time_t currentTime) {
  byte storedFlag = EEPROM.read(ADDR_FLAG);
  if (storedFlag != 123) {
    EEPROM.write(ADDR_FLAG, 123); // Flag to indicate timestamp has been saved
    for (int i = 0; i < sizeof(time_t); i++) {
      EEPROM.write(ADDR_TIMESTAMP + i, (currentTime >> (8 * i)) & 0xFF);
    }
    EEPROM.commit();
    Serial.println("First boot timestamp saved!");
  }
}

time_t readStoredBootTime() {
  time_t storedTime = 0;
  for (int i = 0; i < sizeof(time_t); i++) {
    storedTime |= ((time_t)EEPROM.read(ADDR_TIMESTAMP + i)) << (8 * i);
  }
  return storedTime;
}

void setup() {
  Serial.begin(115200);
  EEPROM.begin(EEPROM_SIZE);

  LCD.init();
  LCD.backlight();
  LCD.setCursor(0, 0);
  LCD.print("Connecting to ");
  LCD.setCursor(0, 1);
  LCD.print("WiFi ");

  WiFi.begin("Wokwi-GUEST", "", 6);
  while (WiFi.status() != WL_CONNECTED) {
    delay(250);
    spinner();
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  LCD.clear();
  LCD.setCursor(0, 0);
  LCD.println("Online");
  LCD.setCursor(0, 1);
  LCD.println("Updating time...");

  configTime(UTC_OFFSET, UTC_OFFSET_DST, NTP_SERVER);
  delay(2000); // Give some time to sync time

  struct tm timeinfo;
  if (getLocalTime(&timeinfo)) {
    time_t currentTime = mktime(&timeinfo);
    storeFirstBootTime(currentTime);

    Serial.print("Stored First Boot Time: ");
    time_t storedBoot = readStoredBootTime();
    Serial.println(ctime(&storedBoot));
  }
}

void loop() {
  printLocalTime();
  delay(250);
}

