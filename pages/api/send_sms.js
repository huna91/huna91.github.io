import axios from "axios";
import { makeSignature } from "../../lib/sms";

// 폰번호 받기
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
    content: "또안됨? ",
    messages: [
      {
        to: phone_num,
      },
    ],
  };

  const date = Date.now().toString();
  const signature = makeSignature(date, _url2);
  console.log(signature, "22222222222222222222222222222222222");
  await axios({
    method: "post",
    url: _url,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-ncp-iam-access-key": process.env.SMS_ACCESS_KEY,
      "x-ncp-apigw-timestamp": date,
      "x-ncp-apigw-signature-v2": signature,
    },
    data: send_data,
  })
    .then(async (res) => {
      console.log(res.data, "성공//1/111/1/1/1///1/1/1");
    })
    .catch((err) => {
      console.log(err.response);
      console.log("실패11/11.1.");
    });
}
