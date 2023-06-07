import axios from "axios";

export default async function login_kakao() {
  console.log("여기 들옴");

  const authcode = await axios({
    url: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
    method: "GET",
  });
  console.log(authcode.data);
  return authcode.data;
}
