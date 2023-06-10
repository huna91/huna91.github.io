const nodemailer = require("nodemailer");
const config = require("../../config");

const transporter = nodemailer.createTransport({
  service: "naver",
  host: "smtp.naver.com",
  port: 465,
  auth: {
    user: config.email.id,
    pass: config.email.pw,
  },
});

// nodemailer 사용
export default function send_voice(req, res) {
  // const jsonData = JSON.parse(req.body.jsonData);
  console.log(req.body);
  // for (let value of req.body.values()) {
  //   console.log(value);
  // }

  res.send(true);
  // let info = {
  //   from: config.email.id,
  //   to: `${email_address}`,
  //   subject: "안녕하세요! 윤하영 입니다.",
  //   html: `<p>해당 메일로 답장 주셔서 연락 부탁드립니다! 감사합니다 :)</p>`,
  //   attachments: [{ path: file }],
  // };
  // // 메일 전송
  // transporter.sendMail(info, (err) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(200).json({ text: "dd" });
  //     // return false;
  //   } else {
  //     console.log("이메일 전송 성공");
  //     // config.email.id = "";
  //     res.status(200).json({ text: "zz" });
  //     // res.send(true);
  //     // return true;
  //   }
  // });
}
