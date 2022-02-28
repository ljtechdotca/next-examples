import { uuid } from "../helpers/uuid";
import { ItemState } from "../types";

export const INIT_ITEM = () => {
  return {
    id: uuid(),
    name: "new",
  } as ItemState;
};
