import { getCsrfToken } from "next-auth/react";
import { useEffect, useState } from "react";

const Kakao_btn = (data) => {
  const chat_url = process.env.KAKAO_URL;
  let [time, setTime] = useState(0);
  useEffect(() => {
    // setTimeout(() => {
    createKakaoButton();
    // }, 100);
  }, []);

  console.log(data.data);
  const createKakaoButton = () => {
    // console.log("카카오 인식 안됨");
    if (window.Kakao) {
      // console.log("카카오 인식 됨");
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        // console.log("중복 방지");
        kakao.init(process.env.KAKAO_JAVASCRIPT_KEY);
      }
    }
  };
  async function send_kakao_msg() {
    await fetch("../api/kakao/send_kakao", {
      method: "POST",
      body: JSON.stringify({ token: data.data }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div>
      <button onClick={send_kakao_msg}>메시지 보내기</button>
    </div>
  );
};

export default Kakao_btn;
