import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "./slices/postsSlice";
import platformReducer from "./slices/platformSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    platforms: platformReducer,
  },
});

export default store;