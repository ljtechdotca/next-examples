import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { newDate } from "lib";
import { ItemProps } from "..";

export interface FormState {
  id: string | null;
  title: string;
  description: string;
  updated: string;
  published: string;
}

const initialState: FormState = {
  id: null,
  title: "",
  description: "",
  updated: newDate(),
  published: newDate(),
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    edit: (state, action: PayloadAction<Partial<ItemProps>>) => {
      Object.assign(state, action.payload);
    },
    title: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      state.updated = newDate();
    },
    description: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
      state.updated = newDate();
    },
    reset: () => {
      return { ...initialState };
    },
  },
});

export const { edit, title, description, reset } = formSlice.actions;

export const selectForm = (state: RootState) => state.formReducer;

export default formSlice.reducer;
