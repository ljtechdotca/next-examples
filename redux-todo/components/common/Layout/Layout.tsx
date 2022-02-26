import styles from "./Layout.module.scss";

  interface LayoutProps {}

  export const Layout = ({}: LayoutProps) => {
    return (
    <div className={styles.root}>
      task: new component Layout
    </div>
  );
}

export default Layout;