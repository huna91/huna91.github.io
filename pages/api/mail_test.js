const nodemailer = require("nodemailer");

export default function mail_test(req, res) {
  const { email_address } = req.body;
  // const jsonData = JSON.parse(req.body);
  console.log(req.body, "확인화긴");
  res.status(200).json({ name: "hd" });
}
