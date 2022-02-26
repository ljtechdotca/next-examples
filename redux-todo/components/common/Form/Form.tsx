import { Button, Input } from "@components/ui";
import { newDate, newId } from "lib";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { submit } from "../List/listSlice";
import styles from "./Form.module.scss";
import { description, reset, selectForm, title } from "./formSlice";

interface FormProps {}

export const Form = ({}: FormProps) => {
  const form = useSelector(selectForm);
  const dispatch = useDispatch();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = form.id ? form.id : newId();
    dispatch(submit({ ...form, id, published: newDate() }));
    dispatch(reset());
  };

  return (
    <form className={styles.root} onSubmit={handleForm}>
      <pre>
        <code>{JSON.stringify(form, null, 2)}</code>
      </pre>
      <Input
        id="title"
        name="title"
        placeholder="Title Here"
        type="text"
        onChange={(event) => dispatch(title(event.target.value))}
        value={form.title}
      />
      <Input
        id="description"
        name="description"
        placeholder="Whats on your mind?"
        type="text"
        onChange={(event) => dispatch(description(event.target.value))}
        value={form.description}
      />
      <Button type="submit">Submit</Button>
      <Button type="reset" onClick={() => dispatch(reset())}>
        Reset
      </Button>
    </form>
  );
};

export default Form;
