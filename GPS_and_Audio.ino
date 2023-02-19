// William
//2/18/2023
// Ack. Arduino
// for Arduino MKR Wifi 1010, HardwareSerial only!!!
/*
USAGE NOTE:
"GPS modules will always send data EVEN IF THEY DO NOT HAVE A FIX! In order
to get 'valid' (not-blank) data you must have the GPS module directly outside,
with the square ceramic antenna pointing up with a clear sky view. In ideal
conditions, the module can get a fix in under 45 seconds. however depending on
your location, satellite configuration, solar flares, tall buildings nearby, RF noise,
etc it may take up to half an hour (or more) to get a fix! This does not mean your
GPS module is broken, the GPS module will always work as fast as it can to get a
fix"
-- Ultimate GPS Breakout v3 Adafruit
*/
     
#include <Adafruit_GPS.h>

#define GPSSerial Serial1

Adafruit_GPS GPS(&GPSSerial);
     
// for debugging purposes
#define GPSECHO false

uint32_t timer = millis();

void setup()
{
  //while (!Serial);  // uncomment to have the sketch wait until Serial is ready

  Serial.begin(115200);
  Serial.println("Adafruit GPS library basic test!");
     
  // 9600 NMEA is the default baud rate for Adafruit MTK GPS's- some use 4800
  GPS.begin(9600);
  // uncomment this line to turn on RMC (recommended minimum) and GGA (fix data) including altitude
  GPS.sendCommand(PMTK_SET_NMEA_OUTPUT_RMCGGA);
  // uncomment this line to turn on only the "minimum recommended" data
  //GPS.sendCommand(PMTK_SET_NMEA_OUTPUT_RMCONLY);
  // For parsing data, we don't suggest using anything but either RMC only or RMC+GGA since
  // the parser doesn't care about other sentences at this time
  // Set the update rate
  GPS.sendCommand(PMTK_SET_NMEA_UPDATE_1HZ); // 1 Hz update rate
  // For the parsing code to work nicely and have time to sort thru the data, and
  // print it out we don't suggest using anything higher than 1 Hz
     
  // Request updates on antenna status, comment out to keep quiet
  GPS.sendCommand(PGCMD_ANTENNA);

  delay(1000);
  
  // Ask for firmware version
  GPSSerial.println(PMTK_Q_RELEASE);
}

void loop() // run over and over again
{
  // read data from the GPS in the 'main loop'
  char c = GPS.read();
  // if you want to debug, this is a good time to do it!
  if (GPSECHO)
    if (c) Serial.print(c);
  // if a sentence is received, we can check the checksum, parse it...
  if (GPS.newNMEAreceived()) {
    //Serial.println(GPS.lastNMEA()); // this also sets the newNMEAreceived() flag to false
    if (!GPS.parse(GPS.lastNMEA())) // this also sets the newNMEAreceived() flag to false
      return; // wait to parse sentence after failing once
  }
  // if millis() or timer wraps around, we'll just reset it
  if (timer > millis()) timer = millis();
     
  // approximately every 2 seconds or so, print out the current stats
  if (millis() - timer > 2000) {
    timer = millis(); // reset the timer
    /*Serial.print("\nTime: ");
    Serial.print(GPS.hour, DEC); Serial.print(':');
    Serial.print(GPS.minute, DEC); Serial.print(':');
    Serial.print(GPS.seconds, DEC); Serial.print('.');
    Serial.println(GPS.milliseconds);*/
    Serial.print("\nTime");
    String time = String(GPS.hour) + ":" + String(GPS.minute) + ":" + String(GPS.seconds);
    Serial.println(time);
    /*Serial.print("Date: ");
    Serial.print(GPS.day, DEC); Serial.print('/');
    Serial.print(GPS.month, DEC); Serial.print("/20");
    Serial.println(GPS.year, DEC);*/
    Serial.print("\nDate") ;       
    String date = String(GPS.year) + "/" + String(GPS.month) + "/20" + String(GPS.year); 
    Serial.println(date);
    //Serial.print("Fix: "); Serial.print((int)GPS.fix);
    //Serial.print(" quality: "); Serial.println((int)GPS.fixquality);
    if (GPS.fix) {
      /*Serial.print("Location: ");
      Serial.print(GPS.latitude, 4); Serial.print(GPS.lat);
      Serial.print(", ");
      Serial.print(GPS.longitude, 4); Serial.println(GPS.lon);*/
      Serial.print("Location: ");
      String location = String(GPS.latitude) + String(GPS.lat) + ", " + String(GPS.longitude) + String(GPS.lon); 
      Serial.println(location);
      Serial.print("Speed (knots): "); Serial.println(GPS.speed);
      String speed = String(GPS.speed);
      Serial.println(speed);
      Serial.print("Angle: "); Serial.println(GPS.angle);
      String angle = String(GPS.angle);
      Serial.println(angle);
      Serial.print("Altitude (CM): "); Serial.println(GPS.altitude/100.0);
      String altitude = String(GPS.altitude/100.0);
      Serial.println(altitude);
      Serial.println();
      Serial.print("Satellites: "); Serial.println((int)GPS.satellites);
      String satellites = String((int)GPS.satellites);
      Serial.println(satellites);
    }
  }
}