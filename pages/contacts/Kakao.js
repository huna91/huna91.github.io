import React, { useEffect, useState } from "react";
import { signIn, useSession, signOut, getCsrfToken } from "next-auth/react";
import utilStyles from "../../styles/utils.module.css";
import btnStyles from "../../styles/button.module.css";
import Kakao_btn from "../../components/button/Kakao_btn";

const Kakao = () => {
  const { data } = useSession();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    // return () => {
    //   document.body.removeChild(script);
    // };
  }, []);

  function getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  return data ? (
    <>
      {data.user?.name}님 환영합니다!
      <br />
      {/* <Image src={data.user.image} width={100} height={100} /> */}
      <Kakao_btn data={data.accessToken} />
      <button onClick={() => signOut()}>로그아웃</button>
    </>
  ) : (
    <div className={utilStyles.prev_login_wrap}>
      <h2>카카오 로그인을 하시면 1:1 채팅 주소를 보내드립니다.</h2>
      <br />
      <button
        className={btnStyles.kakao_login_btn}
        onClick={() => signIn("kakao")}
      ></button>
    </div>
  );
};

export default Kakao;
