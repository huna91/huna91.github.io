import { useState } from "react";
import btnStyles from "../../styles/button.module.css";

const Kakao_btn = (data) => {
  const chat_url = process.env.KAKAO_URL;
  let [time, setTime] = useState(0);

  console.log(data.data);

  async function send_kakao_msg() {
    await fetch("../api/kakao/send_kakao", {
      method: "POST",
      body: JSON.stringify({ token: data.data }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        return alert("주소 전송 성공! 카카오톡 나와의 채팅을 확인해주세요.");
      })
      .catch(() => {
        return alert("주소 전송 실패!");
      });
  }

  return (
    <div>
      <button
        className={btnStyles.kakao_send_btn}
        onClick={() => {
          return send_kakao_msg().then();
        }}
      >
        1:1 채팅 주소 받기
      </button>
    </div>
  );
};

export default Kakao_btn;
