const chatController = require("../Controllers/chat.controller");
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

        // 웰컴 메시지
        const welcomeMessage = {
          chat: `${user.name} is joined to this room`,
          user: { id: null, name: "system" },
        };
        io.emit("message", welcomeMessage);
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
    socket.on("sendMessage", async (message, cb) => {
      try {
        // 유처 찾기 socket id로
        const user = await userController.checkUser(socket.id);

        // 메시지 저장(유저)
        const newMessage = await chatController.saveChat(message, user);
        io.emit("message", newMessage);
        cb({ ok: true });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("connect_error", (err) => {
      console.error("소켓 연결 에러:", err);
    });
  });
};
