import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import Image from "next/image";

export default function Home({ allPostsData }) {
  const contact_data = [
    { image: "/icon/icon-voice.png", name: "voice" },
    { image: "/icon/icon-email.png", name: "email" },
    { image: "/icon/icon-phone.png", name: "phone" },
    { image: "/icon/icon-kakao.png", name: "kakao" },
    { image: "/icon/icon-blockchain.png", name: "blockchain" },
  ];

  const ImageHandler = async (e) => {
    const reader = new FileReader();
    e.preventDefault();
  };
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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Contents</h2>
        <ul className={utilStyles.contents_list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={`${utilStyles.contents_listItem}`} key={id}>
              <Link href={`/posts/${id}`}>
                <Image
                  className={`${utilStyles.contents_listImage}`}
                  alt={`${id}`}
                />
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
