import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_RESTAPI,
      clientSecret: process.env.KAKAO_CLIENT_SECRET_CODE,
    }),
  ],
});