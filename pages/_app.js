import "../styles/globals.css";
import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import MySvg from "../components/mysvg";
import LoaderSpin from "../components/widgets/loader";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [displayChildren, setDisplayChildren] = useState(false);
  useEffect(() => {
    setDisplayChildren(true);
    const handleRouteChangeCompelete = () => {
      gsap.fromTo(
        "#page-container",
        {
          opacity: 0,
          onComplete: () => {
            setDisplayChildren(false);
          },
        },
        {
          duration: 0.5,
          opacity: 1,
          onComplete: () => {
            setDisplayChildren(true);
          },
        }
      );
    };

    router.events.on("routeChangeComplete", handleRouteChangeCompelete);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeCompelete);
    };
  }, [router]);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#000000",
          color: "white",
        },
      }}
    >
      <div id="page-container">
        {displayChildren ? (
          <Component {...pageProps} />
        ) : (
          <LoaderSpin></LoaderSpin>
        )}
      </div>
    </ConfigProvider>
  );
}
