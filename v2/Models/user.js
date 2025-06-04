const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must type name"],
    unique: true,
  },

  // 이 유저가 어떤 연결 아이디를 가지고 접속을 했는지 파악하기 위함
  token: {
    type: String,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
