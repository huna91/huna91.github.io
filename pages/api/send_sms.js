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
    content: "안녕하세요. 윤하영 입니다. 해당 번호로 연락 부탁드립니다.",
    messages: [
      {
        to: phone_num,
      },
    ],
  };

  const date = Date.now().toString();
  const signature = makeSignature(date, _url2);
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
    .then((resolve) => {
      res.send({ result: "문자 전송 성공" });
      return;
    })
    .catch((err) => {
      res.send(err);
    });
}
