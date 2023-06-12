const nodemailer = require("nodemailer");
const config = require("../../config");

export default async function send_mail(req, res) {
  const { email_address } = req.body;
  return new Promise(function (resolve, rej) {
    const transporter = nodemailer.createTransport({
      service: "naver",
      host: "smtp.naver.com",
      port: 465,
      auth: {
        user: config.email.id,
        pass: config.email.pw,
      },
    });

    let info = {
      from: config.email.id,
      to: `${email_address}`,
      subject: "안녕하세요! 윤하영 입니다.",
      html: `<p>해당 메일로 연락 부탁드립니다! 감사합니다 :)</p>`,
    };

    // 메일 전송
    transporter.sendMail(info, (err) => {
      if (err) {
        res.send(false);
      } else {
        res.send(true);
      }
    });
    return true;
  });
}
