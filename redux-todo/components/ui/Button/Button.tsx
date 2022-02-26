import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({
  children,
  ...attributes
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <button className={styles.root} {...attributes}>
      {children}
    </button>
  );
};

export default Button;
