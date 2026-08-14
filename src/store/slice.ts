import { createSlice } from "@reduxjs/toolkit";
import { Event as EventType, User } from "../types/api";

interface SliceState {
  user: User | undefined;
  event: EventType | undefined;
}


const initialState: SliceState = {
  user: undefined,
  event: undefined,
};

export const Slice = createSlice({
  name: "Slice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setEvent: (state, action) => {
      state.event = action.payload;
    },
  },
});

export const { setUser, setEvent } =
  Slice.actions;

export default Slice.reducer;
