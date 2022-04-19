import React from "react";
import { Action } from "../../../types";
import Button from "../../ui/Button/Button";
import styles from "./Item.module.scss";

export interface ItemProps {
  id: string;
  index: number;
  name: string;
  onEvent: ({ type, value }: Action) => {};
}

const Item = ({ id, index, name, onEvent }: ItemProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.flex}>
        <span>{id}</span>
        <span>{name}</span>
      </div>
      <div className={styles.grid}>
        <Button
          label="Update"
          onClick={() =>
            onEvent({ type: "target", value: { id, index, name } })
          }
        />
        <Button
          label="Delete"
          onClick={() => onEvent({ type: "delete", value: id })}
        />
      </div>
    </div>
  );
};

export default Item;
