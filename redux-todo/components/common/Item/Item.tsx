import { Button } from "@components/ui";
import { useDispatch } from "react-redux";
import { edit, FormState } from "../Form/formSlice";
import { remove } from "../List/listSlice";
import styles from "./Item.module.scss";

export interface ItemProps extends FormState {
  id: string;
}

export const Item = ({
  id,
  title,
  description,
  published,
  updated,
}: ItemProps) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      <pre>
        <code>{id}</code>
      </pre>
      <div>{title}</div>
      <div>{description}</div>
      <div>
        {published} | {updated}
      </div>
      <Button onClick={() => dispatch(edit({ id, title, description }))}>
        Edit
      </Button>
      <Button onClick={() => dispatch(remove(id))}>Remove</Button>
    </div>
  );
};

export default Item;
