import { siteTitle } from "./layout";
import Head from "next/head";
import styles from "./BlogLayout.module.scss";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import FancyCard from "./fancyCard";
import MyBreadcrumb from "/components/breadcrumb";
export default function BlogLayout({ children, routes }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={styles.blogLayout}>
        <div className={styles.header}>
          <MyMenu />
        </div>
        <div className={styles.left}>
          <MyBreadcrumb routes={routes} />
          {children}
        </div>
        <div className={styles.right}>
          <FancyCard>
            We are programmed to receive You can check out any time you like，
            But you can never leave
          </FancyCard>
        </div>
      </div>
    </>
  );
}

const items = [
  {
    label: "BLOG",
    key: "Blog",
    icon: <MailOutlined />,
  },
  {
    label: "JS",
    key: "js",
    icon: <MailOutlined />,
  },
  {
    label: "NODE",
    key: "node",
    icon: <AppstoreOutlined />,
  },
  {
    label: "REACT",
    key: "react",
    icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          {
            label: "Option 1",
            key: "setting:a",
          },
          {
            label: "Option 2",
            key: "setting:b",
          },
        ],
      },
    ],
  },
  {
    label: "VUE",
    key: "vue",
    icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
    ],
  },
];
const MyMenu = () => {
  const [current, setCurrent] = useState("Blog");
  const onClick = (e) => {
    setCurrent(e.key);
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
