import type { NextPage } from "next";
import Analytics from "../components/Analytics";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Analytics />
      <h1>Hello World</h1>
    </div>
  );
};

export default Home;
