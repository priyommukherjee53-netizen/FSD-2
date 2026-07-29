import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      title: "React Basics",
      category: "React",
    },
    {
      id: 2,
      title: "Redux Toolkit",
      category: "Redux",
    },
    {
      id: 3,
      title: "React Hooks",
      category: "React",
    },
    {
      id: 4,
      title: "JavaScript ES6",
      category: "JavaScript",
    },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
});

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;

// Basic Selector
export const selectPosts = (state) => state.posts.posts;

// Memoized Selector
export const selectReactPosts = createSelector(
  [selectPosts],
  (posts) => {
    console.log("Selector Recomputed");
    return posts.filter((post) => post.category === "React");
  }
);