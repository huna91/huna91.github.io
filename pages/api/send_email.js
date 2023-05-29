const nodemailer = require("nodemailer");
const config = require("../../config");

// 메일 주소 가져오기
export function catch_add(req, res) {}

// nodemailer 사용
async function send_mail(req, res) {
  let transporter = await nodemailer.createTransport({
    service: "Naver",
    host: "smtp.naver.com",
    port: 587,
    auth: {
      user: config.email.id,
      pass: config.email.pw,
      // user: process.env.EMAIL_ID,
      // pass: process.env.EMAIL_PW,
    },
  });

  // console.log(auth_num);
  let info = {
    from: config.email.id,
    to: email_add,
    subject: "안녕하세요! 윤하영 입니다.",
    html: `<p>해당 메일로 답장 주셔서 연락 부탁드립니다! 감사합니다 :)</p>`,
  };

  // 메일 전송
  transporter.sendMail(info, (err) => {
    if (err) {
      console.log("이메일 전송 에러남");
      config.email.id = "";
      return false;
    } else {
      // Socket.console.log("이메일 전송 성공");
      config.email.id = "";
      return true;
    }
  });
}

module.exports = send_mail;
