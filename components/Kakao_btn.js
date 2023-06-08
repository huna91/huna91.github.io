import { useEffect } from "react";

const Kakao_btn = () => {
  const chat_url = process.env.KAKAO_URL;
  useEffect(() => {
    createKakaoButton();
  }, []);
  console.log("들옴?");

  const createKakaoButton = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    console.log("카카오 인식 안됨");
    if (window.Kakao) {
      console.log("카카오 인식 됨");
      const kakao = window.Kakao;

      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(process.env.KAKAO_CLIENT_RESTAPI);
      }

      kakao.Link.sendDefault({
        objectType: "text",
        content: {
          text: "채팅 시작!",
          //   title: "채팅 시작!",
          //   description: "항상 열려있어요! 톡 주십셔!",
          //   imageUrl: "/public/logo/logo_head.png", // i.e. process.env.FETCH_URL + '/logo.png'
          link: {
            mobileWebUrl: chat_url,
            webUrl: chat_url,
          },
        },
        buttons: [
          {
            title: "바로고!",
          },
        ],
      });
    }
  };

  return (
    <div>
      <button onClick={createKakaoButton}>메시지 보내깅</button>
    </div>
  );
};

export default Kakao_btn;
