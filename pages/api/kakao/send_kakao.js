import axios from "axios";
import QueryString from "qs";

export default async function send_kakao(req, res) {
  const { token } = req.body;
  const api_host = "https://kapi.kakao.com";
  const uri = api_host + "/v2/api/talk/memo/default/send";

  async function call(method, uri, param, header) {
    let rtn;
    try {
      rtn = await axios({
        method: method,
        url: uri,
        headers: header,
        data: param,
      });
    } catch (err) {
      rtn = err.response;
    }
    return rtn.data;
  }

  const param = QueryString.stringify({
    template_object:
      "{" +
      '"object_type": "text",' +
      '"text": "안녕하세요! 윤하영 입니다. 연락주셔서 감사합니다. 자세한 대화는 아래 채팅방에서 부탁드려요:)",' +
      '"link": {' +
      '    "web_url": "https://open.kakao.com/o/swnaoHof",' +
      '    "mobile_web_url": "https://open.kakao.com/o/swnaoHof"' +
      "}," +
      '"button_title": "톡하러 가기!"' +
      "}",
  });
  const header = {
    "content-Type": "application/x-www-form-urlencoded",
    Authorization: "Bearer " + token,
  };

  let rtn = await call("POST", uri, param, header);

  res.send(rtn);
}
