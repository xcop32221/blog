import * as React from 'react'

import styles from '../styles/utils.module.scss'
import { NotionPage } from '../components/notion/NotionPage'
import { rootNotionPageId } from '../lib/config'
import notion from '../lib/notion'
import { MyMenu } from '../components/BlogLayout'
import LoaderSpin from '../components/widgets/loader'
import { useRouter } from 'next/router'
export const getStaticProps = async ({params}) => {
  
  const pageId = (params.pageId) || rootNotionPageId
  const recordMap = await notion.getPage(pageId)
 
  return {
    props: {
      recordMap
    },
    revalidate: 10
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export default function Page({ recordMap }) {
  const router=useRouter()
  if (router.isFallback) {
    return (
      <div className={styles.notionContainer}>
    <MyMenu activekey={'notion'}/>
    <LoaderSpin/>
  </div> 
    )
  }
  return(
    
    <div className={styles.notionContainer}>
    <MyMenu activekey={'notion'}/>
    <NotionPage recordMap={recordMap} rootPageId={rootNotionPageId} />
  </div> 
  )
  
  
}
