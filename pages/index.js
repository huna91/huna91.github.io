import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import Image from "next/image";
import { Contents_ul } from "../styles/styledCom";
import { useState } from "react";

export default function Home({ allPostsData }) {
  const contact_data = [
    { image: "/icon/icon-voice.png", name: "voice" },
    { image: "/icon/icon-email.png", name: "email" },
    { image: "/icon/icon-phone.png", name: "phone" },
    { image: "/icon/icon-kakao.png", name: "kakao" },
    { image: "/icon/icon-blockchain.png", name: "blockchain" },
  ];

  const [page, setPage] = useState(0);
  const slideHandler = async (e) => {
    switch (e) {
      case "LEFT":
        setPage(page - 1);
        break;
      case "RIGHT":
        setPage(page + 1);
        break;

      default:
        break;
    }
    console.log(page);
  };
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>
          안녕하세요. 지혜로운 웹 개발자가 되고자 하는 윤하영 입니다.
          <br /> 현재 페이지 제작 중 입니다.
        </p>
      </section>
      <h2 className={utilStyles.headingLg}>Contact</h2>
      <section className={utilStyles.section_contact}>
        <ul className={`${utilStyles.contact_list}`}>
          {contact_data.map(({ image, name }) => (
            <li className={`${utilStyles.contact_listItem}`} key={name}>
              <Link
                href={{
                  pathname: `contacts/[slug]`,
                  query: { slug: `${name}` },
                }}
              >
                <Image
                  priority
                  className={`${utilStyles.contact_image}`}
                  src={`${image}`}
                  width={100}
                  height={100}
                  alt={`${name}`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <h2 className={utilStyles.headingLg}>Contents</h2>
      <section className={utilStyles.section_contents}>
        <button
          className={utilStyles.contents_left_btn}
          onClick={() => {
            slideHandler("LEFT");
          }}
        >
          {"<"}
        </button>
        <Contents_ul className={utilStyles.contents_list} page={page}>
          {allPostsData.map(({ id, date, title, image }) => (
            <li className={`${utilStyles.contents_listItem}`} key={id}>
              <Link
                className={`${utilStyles.contents_link}`}
                href={`/posts/${id}`}
              >
                <Image
                  priority
                  className={`${utilStyles.contents_listImage}`}
                  src={`/${image}`}
                  width={200}
                  height={200}
                  alt={`${id}`}
                />
                <div>
                  {title}
                  <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={date} />
                  </small>
                </div>
              </Link>
            </li>
          ))}
        </Contents_ul>
        <button
          className={utilStyles.contents_right_btn}
          onClick={() => {
            slideHandler("RIGHT");
          }}
        >
          {">"}
        </button>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
