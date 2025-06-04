const userController = require("../Controllers/user.controller");

module.exports = function (io) {
  console.log("[utils/io.js] io 초기화 함수 실행됨");

  io.on("connection", (socket) => {
    console.log("client is connected ", socket.id);

    // 로그인으로 말햇을 때 이 함수를 실행
    socket.on("login", async (userName, cb) => {
      // 유저정보를 저장

      try {
        const user = await userController.saveUser(userName, socket.id);
        cb({ ok: true, data: user });
        console.log("backend", userName);
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

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
