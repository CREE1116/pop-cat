const socket = new WebSocket("ws://localhost:8080/popcat_server");
socket.onopen = function (e) {
  console.log("[open] 커넥션이 만들어졌습니다.");
};
socket.onmessage = function (event) {
  const Jsondata = JSON.parse(event.data);
  console.log("전달받은 json", Jsondata);
  if (Jsondata.type === "id") {
    console.log("id", Jsondata.id);
    const id = Jsondata.id;
    const data = {
      id: id,
      count: 100,
    };
    socket.send(JSON.stringify(data));
  } else if (Jsondata.type === "ranking") {
    console.log("ranking", Jsondata.ranking);
  } else if (Jsondata.type === "top10") {
    console.log("top10", Jsondata);
  }
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(
      `[close] 커넥션이 정상적으로 종료되었습니다(code=${event.code} reason=${event.reason})`
    );
  } else {
    // 예시: 프로세스가 죽거나 네트워크에 장애가 있는 경우
    // event.code가 1006이 됩니다.
    console.log("[close] 커넥션이 죽었습니다.");
  }
};

socket.onerror = function (error) {
  console.log(`[error]`);
};
