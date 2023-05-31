const nodemailer = require("nodemailer");

export default function mail_test(req, res) {
  const { email_address } = req.body;
  console.log(email_address);
  res.status(200).json({ name: "hd" });
}
