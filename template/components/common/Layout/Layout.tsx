import Head from "../Head/Head";
import styles from "./Layout.module.scss";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Head />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
