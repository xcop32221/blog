import * as React from 'react'
import Head from 'next/head'
import { useEffect } from 'react'
import { getPageTitle } from 'notion-utils'
import { NotionRenderer } from 'react-notion-x'
import dynamic from 'next/dynamic'

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false
  }
)
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false
  }
)
export const NotionPage = ({
  recordMap,
  rootPageId
}) => {
  if (!recordMap) {
    return null
  }
  
  useEffect(() => {
    const hd=document.querySelector('.notion-nav-header')
    hd.style.left='unset'
    hd.style.right='30px'
  },[])
  const title = getPageTitle(recordMap)
 

  return (
    <>
      <Head>
        <meta name='description' content='Notion Page' />

        <title>Space</title>
      </Head>

      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        rootPageId={rootPageId}
        components={{
            Code,
            Collection,
            Equation,
            Modal,
            Pdf
          }}
      />
    </>
  )
}