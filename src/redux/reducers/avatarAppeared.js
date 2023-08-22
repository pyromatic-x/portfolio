import { createSlice } from "@reduxjs/toolkit";

export const avatarAppeared = createSlice({
  name: "avatarAppeared",
  initialState: {
    value: false,
  },
  reducers: {
    toggleAvatarAppearedState: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleAvatarAppearedState } = avatarAppeared.actions;

export default avatarAppeared.reducer;
