import { createSlice } from "@reduxjs/toolkit";
import { Event as EventType, User } from "../types/api";

interface SliceState {
  user: User | undefined;
}


const initialState: SliceState = {
  user: undefined,
};

export const Slice = createSlice({
  name: "Slice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } =
  Slice.actions;

export default Slice.reducer;
