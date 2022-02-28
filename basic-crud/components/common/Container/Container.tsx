import React from "react";
import styles from "./Container.module.scss";

export interface ContainerProps {}

const Container = ({ children }: React.PropsWithChildren<ContainerProps>) => {
  return <div className={styles.root}>{children}</div>;
};

export default Container;
