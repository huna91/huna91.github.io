import React, { useEffect, useState } from "react";
import { signIn, useSession, signOut, getCsrfToken } from "next-auth/react";
import Image from "next/image";
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
  console.log(data);

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
  async function mytoken() {
    const csrfToken = await getCsrfToken();
    console.log(csrfToken);
  }

  return data ? (
    <>
      {data.user?.name}님 반갑
      <br />
      {/* <Image src={data.user.image} width={100} height={100} /> */}
      <Kakao_btn data={data.accessToken} />
      <button onClick={() => signOut()}>로그아웃</button>
    </>
  ) : (
    <>
      로그인 해주셈
      <br />
      <button onClick={() => signIn("kakao")}>로그인</button>
    </>
  );
};

export default Kakao;
