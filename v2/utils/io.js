module.exports = function (io) {
  console.log("[utils/io.js] io 초기화 함수 실행됨");

  io.on("connection", (socket) => {
    console.log("client is connected ", socket.id);

    socket.on("disconnect", () => {
      console.log("client disconnected ", socket.id);
    });

    // 간단한 메시지 테스트용 이벤트 추가
    socket.on("test-message", (msg) => {
      console.log("received test-message:", msg);
      socket.emit("test-reply", "서버에서 답장!");
    });

    socket.on("connect_error", (err) => {
      console.error("소켓 연결 에러:", err);
    });
  });
};
