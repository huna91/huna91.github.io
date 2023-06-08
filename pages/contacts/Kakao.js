import React, { useEffect, useState } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Kakao_btn from "../../components/kakao_btn";

const Kakao = () => {
  const { data } = useSession();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (data) {
    console.log(data);
    return (
      <>
        {data.user?.name}님 반갑
        <br />
        {/* <Image src={data.user.image} width={100} height={100} /> */}
        <Kakao_btn />
        <button onClick={() => signOut()}>로그아웃</button>
      </>
    );
  }
  return (
    <>
      로그인 해주셈
      <br />
      <button onClick={() => signIn("kakao")}>로그인</button>
    </>
  );
};

export default Kakao;
