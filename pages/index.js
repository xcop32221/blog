import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.scss";
import { getSortedPostsData } from "../lib/post";
import Link from "next/link";
import { useRouter } from "next/router";
import gsap from "gsap";
import { useLayoutEffect, useRef, useEffect } from "react";
import { Button, theme } from "antd";
import EnterButton from "../components/widgets/enterButton";
const { useToken } = theme;
export default function Home({ allPostsData }) {
  const headRef = useRef(null);
  const btn = useRef(null);
  const { token } = useToken();
  const router = useRouter();
  useRouter;
  useLayoutEffect(() => {
    const tl = gsap.timeline();
    tl.from(headRef.current, {
      duration: 2,
      opacity: 0,
      x: 100,
      ease: "power4.out",
    });
    tl.from(btn.current, {
      duration: 3,
      opacity: 1,
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
            Welcome to my personal website! 😊 I'm a front-end engineer
            specializing in modern web technologies. This is where I share my
            insights and experience on front-end development and web
            technologies, as well as my personal interests. I welcome your
            feedback and hope you find value in browsing my blog. 🚀
          </p>
        </section>

        {/* <Link href="/posts/ssg-ssr">More Pages</Link> */}

        <EnterButton
          onClick={() => {
            router.push("/posts");
          }}
          ref={btn}
        >
          Welcom to my space
        </EnterButton>
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
