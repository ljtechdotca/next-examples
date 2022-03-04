import styles from "@styles/Home.module.css";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [data, setData] = useState<Record<string, any>>({});

  const wave = async () => {
    try {
      const response = await fetch("/api/test");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.root}>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
      <button onClick={wave}>Say Hello</button>
    </div>
  );
};

export default Home;
