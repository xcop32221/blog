import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.scss";
import { getSortedPostsData } from "../lib/post";
import Link from "next/link";
import Date from "../components/date";
import LoaderSpin from "../components/widgets/loader";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { Button, theme } from "antd";
const { useToken } = theme;
export default function Home({ allPostsData }) {
  const headRef = useRef(null);
  const contentRef = useRef(null);
  const { token } = useToken();
  useLayoutEffect(() => {
    const tl = gsap.timeline();
    tl.from(headRef.current, {
      duration: 1,
      opacity: 0,
      x: 100,
      ease: "power4.out",
    });
    tl.from(contentRef.current, {
      duration: 1,
      opacity: 0,
      y: 100,
      ease: "power4.out",
    });
  }, []);
  return (
    <div className={utilStyles.bg}>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          {/* <LoaderSpin /> */}
          <p ref={headRef}>
            Welcom to my blog 😛 I am a front-end development engineer, love to
            study front-end technology, and love skateboarding and hip-hop music
            in my life
          </p>
        </section>
        <section
          className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
          ref={contentRef}
        >
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
        <Link href="/posts/ssg-ssr">More Pages</Link>
        <Button
          style={{ backgroundColor: token.colorPrimary, color: token.color }}
        >
          Primary Button
        </Button>
      </Layout>
    </div>
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
