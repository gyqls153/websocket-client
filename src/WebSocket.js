import config from './config.json'

console.log("WebSocket");

const ws = new WebSocket(`ws://${config[config.ENV].addressIp}`);

ws.onopen = function(event) {
  //ws.send("Client message: Hi!");
  console.log("Server message: ", event.data);
}

// 서버로 부터 메시지를 수신한다
ws.onmessage = function(event) {
  console.log("Server message: ", event.data);
}

// error event handler
ws.onerror = function(event) {
  console.log("Server error message: ", event.data);
}

export default ws;