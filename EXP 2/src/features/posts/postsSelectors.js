import { createSelector } from "@reduxjs/toolkit";

const selectPosts = (state) => state.posts.posts;

export const selectLinkedInPosts = createSelector(
  [selectPosts],
  (posts) =>
    posts.filter((post) => post.platform === "LinkedIn")
);