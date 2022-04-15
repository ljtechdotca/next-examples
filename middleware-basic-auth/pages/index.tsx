import type { NextPage } from "next";
import { FormEvent, useState } from "react";
import styles from "../assets/Home.module.css";

const Home: NextPage = () => {
  const [data, setData] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );

    try {
      const btoa = window.btoa(`${formData.user}:${formData.pwd}`);
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      setData(json);
      setSubmitting(false);
    } catch (error) {
      setData(error);
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.base}>
        <p>
          Credentials: <code>ljtech:ljtech</code>
        </p>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
        <form onSubmit={submitting ? () => {} : onSubmit}>
          <input id="user" name="user" type="text" placeholder="User" />
          <input id="pwd" name="pwd" type="password" placeholder="Pwd" />
          <button>{submitting ? "Submitting..." : "Submit"}</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
