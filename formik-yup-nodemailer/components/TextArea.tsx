import { useField } from "formik";

const TextArea: React.FC<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
> = ({ ...props }) => {
  const [field] = useField(props as any);

  return <textarea {...field} {...props} />;
};

export default TextArea;
