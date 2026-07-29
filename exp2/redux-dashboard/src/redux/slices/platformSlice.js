import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  platforms: [
    "Instagram",
    "Facebook",
    "Twitter",
    "LinkedIn",
    "YouTube",
  ],
};

const platformSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {
    addPlatform: (state, action) => {
      state.platforms.push(action.payload);
    },
  },
});

export const { addPlatform } = platformSlice.actions;

export default platformSlice.reducer;