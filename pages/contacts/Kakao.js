import React, { useEffect, useState } from "react";
import { signIn, useSession, signOut, getCsrfToken } from "next-auth/react";
import utilStyles from "../../styles/utils.module.css";
import btnStyles from "../../styles/button.module.css";
import Kakao_btn from "../../components/button/Kakao_btn";
import Image from "next/image";

const Kakao = () => {
  const { data } = useSession();
  useEffect(() => {
    const script = document.createElement("script");
    new Promise(() => {
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;
      document.body.appendChild(script);
    }).then(() => {
      if (window.Kakao) {
        const kakao = window.Kakao;

        if (!kakao.isInitialized()) {
          kakao.init(process.env.KAKAO_JAVASCRIPT_KEY);
        }
      }
    });
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return data ? (
    <div className={utilStyles.kakao_container}>
      <div className={utilStyles.kakao_login_wrap}>
        <h2>
          {data.user?.name}님 <br />
        </h2>
        <h4>관심주셔서 감사합니다!</h4>
        <br />
        <Image
          className={utilStyles.kakao_login_img}
          src={data.user.image}
          width={100}
          height={100}
        />
        <Kakao_btn data={data.accessToken} />
        <button
          className={utilStyles.kakao_logout_btn}
          onClick={() => signOut()}
        >
          로그아웃
        </button>
      </div>
    </div>
  ) : (
    <div className={utilStyles.kakao_container}>
      <div className={utilStyles.kakao_login_wrap}>
        <h3>로그인 하시면 </h3>
        <h3>'1:1 채팅 주소'를 </h3> <h3>보내드립니다.</h3>
        <br />
        <button
          className={btnStyles.kakao_login_btn}
          onClick={() => signIn("kakao")}
        ></button>
      </div>
    </div>
  );
};

export default Kakao;
