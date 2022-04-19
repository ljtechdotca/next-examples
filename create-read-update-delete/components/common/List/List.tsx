import { Action, ItemState } from "../../../types";
import Item from "../Item/Item";
import styles from "./List.module.scss";

export interface ListProps {
  items: ItemState[];
  onEvent: ({ type, value }: Action) => {};
}

const List = ({ items, onEvent }: ListProps) => {
  return (
    <div className={styles.root}>
      {items.map((item, index) => (
        <Item key={item.id} index={index} onEvent={onEvent} {...item} />
      ))}
    </div>
  );
};

export default List;
