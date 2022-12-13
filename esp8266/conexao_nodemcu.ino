// Inclusão das bibliotecas
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>

// Configração do WiFi
const char* ssid = "VIVOFIBRA-9EE2";  // SSID Wifi
const char* password = "33d7019ee2";  // Senha Wifi

const char *host = "https://bakendtg.herokuapp.com";
const int httpsPort = 443;

const char fingerprint[] PROGMEM = "D6 27 27 66 FB 8A 91 E6 31 3A B8 AF B1 79 4B 8F C7 A6 5A DC";
//D6:27:27:66:FB:8A:91:E6:31:3A:B8:AF:B1:79:4B:8F:C7:A6:5A:DC

// Variáveis de Server e Status do LED
ESP8266WebServer server(80);
bool LEDstatus = LOW;

void setup() {
  // Inicia Serial e LED
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);

  // Inicia Conexão WiFi
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.println("");

  // Aguarda Conexão e Informa IP
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Rede WiFi: ");
  Serial.println(ssid);
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());
  delay(100);

  // Configura Handles do Server e Inicia Server
  server.on("/", handle_OnConnect);
  server.on("/abrir", handle_ledon);
  server.on("/fechar", handle_ledoff);
  server.onNotFound(handle_NotFound);
  server.begin();
  Serial.println("Servidor HTTP iniciado!");

}

void loop() {
  server.handleClient();    // Faz o Handle
  if (LEDstatus)            // Checa se LED deve acender
    digitalWrite(LED_BUILTIN, HIGH);  
  else
    digitalWrite(LED_BUILTIN, LOW);
}

// FUNÇÕES HANDLE PARA HTML SERVER
void handle_OnConnect() {
  LEDstatus = LOW;
  server.send(200, "text/html", SendHTML(false));
}

void handle_ledon() {
  LEDstatus = HIGH;
  server.send(200, "text/html", SendHTML(true));
  postInfo("1");
}

void handle_ledoff() {
  LEDstatus = LOW;
  server.send(200, "text/html", SendHTML(false));
  postInfo("0");
}

void handle_NotFound() {
  server.send(404, "text/plain", "Not found");
}

String SendHTML(uint8_t led) {
  String ptr = "<!DOCTYPE html>\n";
  ptr += "<html>\n";
  ptr += "<head>\n";
  ptr += "<title>Monitoramento de clamp</title>\n";
  ptr += "</head>\n";
  ptr += "<body>\n";
  ptr += "<p>Clique para abrir ou fechar o clamp.</p>\n\n\n";
  ptr += "<form method=\"get\">\n";
  if (led)
    ptr += "<input type=\"button\" value=\"ABRIR\" onclick=\"window.location.href='/fechar'\">\n";
  else
    ptr += "<input type=\"button\" value=\"FECHAR\" onclick=\"window.location.href='/abrir'\">\n";
  ptr += "</form>\n";
  ptr += "</body>\n";
  ptr += "</html>\n";
  return ptr;
}

// Envia os dados para o servidor de testes
void postInfo(String status) {
  WiFiClientSecure httpsClient;
  Serial.printf("Using fingerprint '%s'\n", fingerprint);
  httpsClient.setFingerprint(fingerprint);
  httpsClient.setTimeout(15000); // 15 Seconds
  delay(1000);

  Serial.print("HTTPS Connecting");
  int r=0; //retry counter
  while((!httpsClient.connect(host, httpsPort)) && (r < 30)){
      delay(100);
      r++;
  }
  
  if(r==30) {
    Serial.println("CONEXÃO FALHOU");
  }
  else {
    Serial.println("CONECTADO NA WEB COM SUCESSO");
  }

  String Link;
  String macAddress = WiFi.macAddress();
  
  //POST Data
  Link = "api/clamp/update";

  Serial.println("ENDPOINT " + Link);
  Serial.println("MAC " + macAddress);

    httpsClient.print(String("POST ") + Link + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "Content-Type: application/x-www-form-urlencoded"+ "\r\n" +
               "Content-Length: 13" + "\r\n\r\n" +
               "m=" + macAddress + "&s=" + status + "\r\n" +
               "Connection: close\r\n\r\n");

  Serial.println("REQUEST SEND");

  while (httpsClient.connected()) {
    String line = httpsClient.readStringUntil('\n');
    if (line == "\r") {
      Serial.println("headers received");
      break;
    }
  }

  Serial.println("reply was:");
  Serial.println("==========");
  String line;
  while(httpsClient.available()){        
    line = httpsClient.readStringUntil('\n');  //Read Line by Line
    Serial.println(line); //Print response
  }
  Serial.println("==========");
  Serial.println("closing connection");
    
  delay(2000);
}
