import { Breadcrumb } from "antd";
import Link from "next/link";

export default function MyBreadcrumb({ routes }) {
  const handle = routes.split("/");
  handle[0] = "home";
  const items = handle.map((item, index) => {
    return {
      title: (
        <Link
          href={
            index === 0
              ? "/"
              : routes
                  .split("/")
                  .slice(0, index + 1)
                  .join("/")
          }
        >
          {item}
        </Link>
      ),
    };
  });

  return <Breadcrumb items={items} />;
}
