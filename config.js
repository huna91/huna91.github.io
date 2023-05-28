const dot = require("dotenv").config();

// 데이터베이스 접속 정보
const config = {
  email: {
    id: process.env.EMAIL_ID,
    pw: process.env.EMAIL_APP_PASSWORD,
  },
};

module.exports = config;
