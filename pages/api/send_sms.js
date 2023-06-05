import axios from "axios";
import CryptoJS from "crypto-js";

export default async function send_sms(req, res) {
  const { phone_num } = req.body;
  const serviceId = process.env.SERVICE_ID;
  const _url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
  const _url2 = `/sms/v2/services/${serviceId}/messages`;
  const send_data = {
    type: "SMS",
    contentType: "COMM",
    countryCode: "82",
    from: process.env.MY_PHONE,
    content: "안녕하세요. ",
    messages: [
      {
        to: phone_num,
      },
    ],
  };

  async function makeSignature() {
    // const message = [];
    const space = " ";
    const newLine = "\n";
    const method = "POST";
    const timestamp = Date.now().toString(); // current timestamp (epoch)
    const accessKey = process.env.SMS_ACCESS_KEY; // access key id (from portal or Sub Account)
    const secretKey = process.env.SMS_SECRET_KEY;

    // const hmac = crypto.createHmac("sha256", process.env.SMS_SECRET_KEY);
    // message.push(method);
    // message.push(space);
    // message.push(_url);
    // message.push(newLine);
    // message.push(timestamp);
    // message.push(newLine);
    // message.push(accessKey);
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(_url2);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);

    // const hash = hmac.update(message.join("")).digest("base64");
    const hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
  }

  const _config = {
    "Content-Type": "application/json; charset=utf-8",
    "x-ncp-apigw-timestamp": Date.now().toString(),
    "x-ncp-iam-access-key": process.env.SMS_ACCESS_KEY,
    "x-ncp-apigw-signature-v2": await makeSignature(),
  };
  await axios
    .post(_url, send_data, _config)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("durltj????????????");
      console.log(err);
    });
}
