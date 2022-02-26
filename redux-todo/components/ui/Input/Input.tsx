import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ ...attributes }: InputProps) => {
  return <input className={styles.root} {...attributes} />;
};

export default Input;
