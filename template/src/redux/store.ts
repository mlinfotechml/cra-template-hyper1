import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./slices/commonSlice";

export const store = configureStore({
  reducer: {
    common: commonSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const dispatch = store.dispatch;