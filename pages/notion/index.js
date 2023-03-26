import { MyMenu } from "../../components/BlogLayout";
import styles from '../../styles/utils.module.scss'
import { NotionPage } from '../../components/notion/NotionPage'
import notion from "../../lib/notion";
import { rootNotionPageId } from "../../lib/config";

export default function Notion({ recordMap, text }) {
  
  return (
    <div className={styles.notionContainer}>
        <MyMenu activekey={'notion'}/>
        <NotionPage recordMap={recordMap} rootPageId={rootNotionPageId}></NotionPage>
    </div>
  );
}
export async function getStaticProps() {
    const pageId = rootNotionPageId
    const recordMap = await notion.getPage(pageId)
  return {
    props: {
      recordMap
    },
    revalidate: 10
  };
}