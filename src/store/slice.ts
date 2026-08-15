import { createSlice } from "@reduxjs/toolkit";
import { Event as EventType, User } from "../types/api";

interface SliceState {
  userId: User | undefined;
  eventId: number | undefined;
}


const initialState: SliceState = {
  userId: undefined,
  eventId: undefined,
};

export const Slice = createSlice({
  name: "Slice",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setEventId: (state, action) => {
      state.eventId = action.payload;
    },
  },
});

export const { setUserId, setEventId } =
  Slice.actions;

export default Slice.reducer;
