import { Form, List } from "@components/common";
import styles from "@styles/Home.module.scss";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Form />
      <List />
    </div>
  );
};

export default Home;
