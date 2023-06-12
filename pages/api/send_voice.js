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
  return new Promise(() => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: "formdata parsing 실패" });
        return;
      }

      const { name, position, phone, email } = JSON.parse(fields.jsonData);

      const { file } = files;
      const info = {
        from: config_mail.email.id,
        to: config_mail.email.id,
        subject: `${name} ${position}님의 목소리 전달`,
        html: `<p>phone : ${phone}</p><p>email : ${email}</p>`,
        attachments: [{ path: file.filepath, filename: file.originalFilename }],
      };
      // 메일 전송
      transporter.sendMail(info, (err) => {
        if (err) {
          // res.status(200).json({ error: err });
          res.send(false);
        } else {
          // res.status(200).json({ message: "녹음 파일 받기 성공" });
          res.send(true);
        }
      });
    });
    return true;
  });
}
