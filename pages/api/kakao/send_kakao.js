import axios from "axios";

export default async function send_kakao(req, res) {
  window.Kakao.Share.sendDefault({
    objectType: "text",
    text: "임의의 버튼을 설정할 수도 있습니다. 여러 장의 이미지, 프로필 정보 등 보다 확장된 형태의 카카오톡 공유는 다른 템플릿을 이용해 보낼 수 있습니다.",
    link: {
      // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
      mobileWebUrl: "https://developers.kakao.com",
      webUrl: "https://developers.kakao.com",
    },
  });

  useEffect(() => {
    // window.Kakao.init(process.env.KAKAO_APP_KEY);
    // console.log("카카오 API 잘 불러와짐?", window.Kakao.isInitialized());
  }, []);

  return;
}
