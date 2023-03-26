import utilStyles from "../../styles/utils.module.scss";
import { getSortedPostsData, getTextData } from "../../lib/post";
import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import Date from "/components/date";
import BlogLayout from "../../components/BlogLayout";
import { useRouter } from "next/router";
export default function Post({ allPostsData, text }) {
  const contentRef = useRef(null);
  const router = useRouter();
  useLayoutEffect(() => {
    const tl = gsap.timeline();
    tl.from(contentRef.current, {
      duration: 1,
      opacity: 0,
      y: 100,
      ease: "power4.out",
    });
  });
  return (
    <BlogLayout routes={router.pathname} text={text} path='article'>
      <section
        className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
        ref={contentRef}
      >
        <h2 className={utilStyles.headingLg}>JavaScript</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/article/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </BlogLayout>
  );
}
export async function getStaticProps() {
  const allPostsData = getSortedPostsData('article');
  const text = getTextData()[1];
  return {
    props: {
      allPostsData,
      text,
    },
  };
}
