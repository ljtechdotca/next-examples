import { useDispatch, useSelector } from "react-redux";
import { Item } from "..";
import styles from "./List.module.scss";
import { selectList } from "./listSlice";

interface ListProps {}

export const List = ({}: ListProps) => {
  const { items } = useSelector(selectList);
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
};

export default List;
