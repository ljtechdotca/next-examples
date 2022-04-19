import type { AppProps } from "next/app";
import "../assets/globals.scss";
import Layout from "../components/common/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
