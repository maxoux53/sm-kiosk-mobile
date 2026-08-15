import { createSlice } from "@reduxjs/toolkit";
import { Event as EventType, User } from "../types/api";

interface SliceState {
  user: User | undefined;
  hasEvent: boolean;
}


const initialState: SliceState = {
  user: undefined,
  hasEvent: false,
};

export const Slice = createSlice({
  name: "Slice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setHasEvent: (state, action) => {
      state.hasEvent = action.payload;
    },
  },
});

export const { setUser, setHasEvent } =
  Slice.actions;

export default Slice.reducer;
