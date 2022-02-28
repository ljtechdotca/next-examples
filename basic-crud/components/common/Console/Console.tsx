import styles from "./Console.module.scss";

export interface ConsoleProps {
  message: null | string;
}

const Console = ({ message }: ConsoleProps) => {
  return (
    <div className={styles.root}>
      <pre>
        <code>{message ?? "NULL"}</code>
      </pre>
    </div>
  );
};

export default Console;
