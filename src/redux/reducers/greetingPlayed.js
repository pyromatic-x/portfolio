import { createSlice } from "@reduxjs/toolkit";

export const greetingPlayed = createSlice({
  name: "greetingPlayed",
  initialState: {
    value: false,
  },
  reducers: {
    toggleGreetingState: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleGreetingState } = greetingPlayed.actions;

export default greetingPlayed.reducer;
