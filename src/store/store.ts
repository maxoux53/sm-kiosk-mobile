import { configureStore } from "@reduxjs/toolkit";
import Slice from "./slice";

export const store = configureStore({
  reducer: { Slice: Slice }
});

export type RootState = ReturnType<typeof store.getState>;
