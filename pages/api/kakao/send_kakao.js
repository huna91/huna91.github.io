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
      '"text": "텍스트 영역입니다. 최대 200자 표시 가능합니다.",' +
      '"link": {' +
      '    "web_url": "https://developers.kakao.com",' +
      '    "mobile_web_url": "https://developers.kakao.com"' +
      "}," +
      '"button_title": "바로 확인"' +
      "}",
  });

  const header = {
    "content-Type": "application/x-www-form-urlencoded",
    Authorization: "Bearer " + token,
  };

  let rtn = await call("POST", uri, param, header);
  console.log();
  console.log(rtn);
  res.send(rtn);
}

// window.Kakao.Share.sendDefault({
//   objectType: "text",
//   text: "임의의 버튼을 설정할 수도 있습니다. 여러 장의 이미지, 프로필 정보 등 보다 확장된 형태의 카카오톡 공유는 다른 템플릿을 이용해 보낼 수 있습니다.",
//   link: {
//     // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
//     mobileWebUrl: "https://developers.kakao.com",
//     webUrl: "https://developers.kakao.com",
//   },
// });

// useEffect(() => {
//   // window.Kakao.init(process.env.KAKAO_APP_KEY);
//   // console.log("카카오 API 잘 불러와짐?", window.Kakao.isInitialized());
// }, []);
