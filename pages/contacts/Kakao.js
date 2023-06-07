import React, { useEffect, useState } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";

const Kakao = () => {
  const { data } = useSession();
  if (data) {
    console.log(data);
    return (
      <>
        {data.user?.name}님 반갑
        <br />
        {/* <Image src={data.user.image} width={100} height={100} /> */}
        <button onClick={() => signOut()}>로그아웃</button>
      </>
    );
  }
  console.log("!!!!");
  return (
    <>
      로그인 해주셈
      <br />
      <button onClick={() => signIn("kakao")}>로그인</button>
    </>
  );

  // const REST_API_KEY = process.env.KAKAO_APP_RESTAPI_KEY;
  // const REDIRECT_URI = "http://localhost:3000/api/kakao/login_kakao";
  // async function submit() {
  //   await fetch("../api/send_kakao", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => {
  //     console.log(res);
  //     console.log("결과");
  //   });
  // }

  // const [loginActive, setLoginActive] = useState(false);
  // async function Login() {
  //   const Login = await fetch("../api/kakao/login_kakao", {
  //     cache: "no-store",
  //   });
  //   console.log(Login);
  // }

  // return (
  //   <div>
  //     <div>{/* <button onClick={Login}>카카오 로그인</button> */}</div>
  //   </div>
  // );
};

export default Kakao;
