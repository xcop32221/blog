import { siteTitle } from "./layout";
import Head from "next/head";
import styles from "./BlogLayout.module.scss";
import utilStyles from "../styles/utils.module.scss";
import Image from "next/image";
import {
  FileTwoTone,
  AppstoreTwoTone,
  BulbTwoTone
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import FancyCard from "./fancyCard";
import MyBreadcrumb from "../components/breadCrumb";
import { useRouter } from "next/router";
// import DyLogo from "/components/widgets/dyLogo";

export default function BlogLayout({ children, routes, text,path }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={styles.blogLayout}>
        <div className={styles.header}>
          {/* <DyLogo /> */}
          <MyMenu activekey={path}/>
        </div>
            <div className={styles.left}>
            <MyBreadcrumb routes={routes} />

            {children}
           </div>
            <div className={styles.right}>
            <FancyCard>{text}</FancyCard>
          </div>
      </div>
    </>
  );
}

const items = [
  {
    label: "Conclusions",
    key: "notion",
    icon: <BulbTwoTone />,
  },
  {
    label: "Article",
    key: "article",
    icon: <FileTwoTone />,
  },
  {
    label: "Blog",
    key: "posts",
    icon: <AppstoreTwoTone />,
  },
  {
    label: <Image
    priority
    src="/images/profile.jpg"
    className={utilStyles.borderCircle}
    height={80}
    width={80}
    style={{marginTop:'10px'}}
    alt=""
  />,
    key: "avatar",
   
  },
  
  
];
const MyMenu = ({activekey}) => {
  const router = useRouter();
  const [current, setCurrent] = useState(activekey);
  const onClick = (e) => {
    if (e.key!=='avatar') {
      setCurrent(e.key);
      router.push(`/${e.key}`);
    }
    else{
      router.push(`/`)
    }
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export { MyMenu };