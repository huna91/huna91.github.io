import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import Image from "next/image";

export default function Home({ allPostsData }) {
  const contact_data = [
    { image: "", title: "블록체인" },
    { image: "", title: "목소리 " },
    { image: "", title: "이메일" },
    { image: "", title: "휴대폰" },
    { image: "", title: "" },
  ];
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>개발자 윤하영 입니다.</p>
        {/* <p>
          (This is a sample website - you’ll be building a site like this in{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p> */}
      </section>
      <section>
        <h2 className={utilStyles.headingLg}>Contact</h2>
        <ul>
          {contact_data.map(({ image, title }) => {
            <li className={`${utilStyles.listItem}`}>
              <Link>
                <Image />
                {title}
              </Link>
            </li>;
          })}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={`${utilStyles.listItem}`} key={id}>
              <Link href={`/posts/${id}`}>
                <Image className={`${utilStyles.list_image}`} />
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
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
