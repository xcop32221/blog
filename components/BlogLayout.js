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
import MyBreadcrumb from "../components/breadCrumb";
import DyLogo from "/components/widgets/dyLogo";

export default function BlogLayout({ children, routes, text }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={styles.blogLayout}>
        <div className={styles.header}>
          {/* <DyLogo /> */}
          <MyMenu />
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
