import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: ["LinkedIn", "Twitter", "Instagram"],
};

const platformSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {},
});

export default platformSlice.reducer;