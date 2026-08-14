import { createSlice } from "@reduxjs/toolkit";
import { Event as EventType } from "../types/api";

interface SliceState {
  userId: number | undefined;
  event: EventType | undefined;
}


const initialState: SliceState = {
  userId: undefined,
  event: undefined,
};

export const Slice = createSlice({
  name: "Slice",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setEvent: (state, action) => {
      state.event = action.payload;
    },
  },
});

export const { setUserId, setEvent } =
  Slice.actions;

export default Slice.reducer;
