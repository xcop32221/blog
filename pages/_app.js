import "../styles/globals.css";
import { ConfigProvider } from "antd";
import { useEffect, useState ,useLayoutEffect} from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import LoaderSpin from "../components/widgets/loader";
import '../styles/globals.css'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'



// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
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
    // router.events.on("routeChangeStart", handleRouteChangeCompelete);
    router.events.on("routeChangeComplete", handleRouteChangeCompelete);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeCompelete);
      // router.events.off("routeChangeStart", handleRouteChangeCompelete);
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
