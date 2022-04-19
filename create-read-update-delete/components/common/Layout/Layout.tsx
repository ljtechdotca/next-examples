import React from "react";
import styles from "./Layout.module.scss";

export interface LayoutProps {}

const Layout = ({ children }: React.PropsWithChildren<LayoutProps>) => {
  return <div className={styles.root}>{children}</div>;
};

export default Layout;
