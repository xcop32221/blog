import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/post";
// Add this import
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.scss";
import { useRouter } from "next/router";
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
//q:如果这个页面是ssr方式用什么api?
//a: getServerSideProps

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: true,
  };
}
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
