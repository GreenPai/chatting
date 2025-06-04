const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors);

const MONGO_URI =
  "mongodb://root:1234@3.34.124.218:27017/mydb?authSource=admin";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("connected to database"))
  .catch("연결 실패");
/*
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"));
*/
module.exports = app;
