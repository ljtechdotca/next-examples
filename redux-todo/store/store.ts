import formReducer from "@components/common/Form/formSlice";
import listReducer from "@components/common/List/listSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    listReducer,
    formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
