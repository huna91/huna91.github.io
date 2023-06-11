import nodemailer from "nodemailer";
import config_mail from "../../config";
import formidable from "formidable";

const transporter = nodemailer.createTransport({
  service: "naver",
  host: "smtp.naver.com",
  port: 465,
  auth: {
    user: config_mail.email.id,
    pass: config_mail.email.pw,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// nodemailer 사용
export default async function send_voice(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: "formdata parsing 실패" });
      return;
    }

    const { name, position, phone, email } = fields.jsonData;
    const { file } = files;
    // console.log(file.filepath);
    const info = {
      from: `${email}`,
      to: config_mail.email.id,
      subject: "안녕하세요! 윤하영 입니다.",
      html: `<p>해당 메일로 답장 주셔서 연락 부탁드립니다! 감사합니다 :)</p>`,
      attachments: [{ path: file.filepath }],
    };
    console.log("들왔나?");
    // 메일 전송
    transporter.sendMail(info, (err) => {
      if (err) {
        res.status(200).json({ error: err });
        return false;
      } else {
        console.log("목소리 전송 성공");
        res.status(200).json({ message: "녹음 파일 받기 성공" });
        // res.send(true);
        // return true;
      }
    });
  });
  // res.status(200).json({ message: "녹음 파일 받기 성공" });
}
