import Head from "next/head";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import Voice from "./Voice";
import Email from "./Email";
import Phone from "./Phone";
import Kakao from "./Kakao";
import Board from "./Board";

export default function Contact() {
  const router = useRouter();
  return (
    <Layout>
      {/* <Head>{`${router.query.id}`}</Head> */}
      <Head>
        <title>{`Contact`}</title>
      </Head>
      {"voice" === `${router.query.id}` ? <Voice /> : <></>}
      {"email" === `${router.query.id}` ? <Email /> : <></>}
      {"phone" === `${router.query.id}` ? <Phone /> : <></>}
      {"kakao" === `${router.query.id}` ? <Kakao /> : <></>}
      {"board" === `${router.query.id}` ? <Board /> : <></>}
    </Layout>
  );
}

export async function getContactPaths() {}
