import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import styles from "./layout.module.css";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import profile from "../../public/images/profile.jpg";

const name = "import HY";
export const siteTitle = "import HY";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/logo/logo_head.png" />
      </Head>
      <Script />
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src={profile}
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src={profile}
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt={name}
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main className={styles.main_wrap}>{children}</main>
      {!home && (
        <div className={styles.backToHome_wrap}>
          <Link className={styles.backToHome_link} href="/">
            <div className={styles.backToHome_link_div}>GO!</div>
          </Link>
        </div>
      )}
    </div>
  );
}
