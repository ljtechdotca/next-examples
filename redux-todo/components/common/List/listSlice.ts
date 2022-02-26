import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { ItemProps } from "..";
import { FormState } from "../Form/formSlice";

export interface ListState {
  items: ItemProps[];
}

const initialState: ListState = {
  items: [],
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    submit: (state, action: PayloadAction<ItemProps>) => {
      const target = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (target > -1) {
        state.items[target] = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { submit, remove } = listSlice.actions;

export const selectList = (state: RootState) => state.listReducer;

export default listSlice.reducer;
