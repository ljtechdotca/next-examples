import styles from "@assets/styles/Home.module.scss";
import { fetcher } from "@lib/api";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const testMethods = async (method: string) => {
    switch (method) {
      case "GET":
        const getResponse = await fetcher.get("/api");
        console.log({ getResponse });
        break;
      case "POST":
        const postResponse = await fetcher.post("/api", { lorem: "ipsum" });
        console.log({ postResponse });
        break;

      case "PUT":
        const putResponse = await fetcher.put("/api?id=123", { foo: "bar" });
        console.log({ putResponse });
        break;

      case "DELETE":
        const deleteResponse = await fetcher.delete("/api?id=123");
        console.log({ deleteResponse });
        break;

      default:
        break;
    }
  };

  return (
    <div className={styles.root}>
      Hello World
      <div>
        <button onClick={() => testMethods("GET")}>GET</button>
        <button onClick={() => testMethods("POST")}>POST</button>
        <button onClick={() => testMethods("PUT")}>PUT</button>
        <button onClick={() => testMethods("DELETE")}>DELETE</button>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
