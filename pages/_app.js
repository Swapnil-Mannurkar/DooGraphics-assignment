import { useEffect, useState } from "react";
import { Router } from "next/router";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/ui/Layout";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      window.scrollTo(0, 0);
      setIsLoading(true);
    };

    const handleRouteChangeComplete = (url) => {
      window.scrollTo(0, 0);
      setIsLoading(false);
    };

    const handleRouteChangeError = (error, url) => {
      window.scrollTo(0, 0);
      setIsLoading(false);
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    Router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      Router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        {isLoading && <LoadingSpinner />}
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
