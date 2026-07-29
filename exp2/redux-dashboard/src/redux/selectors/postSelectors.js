import { createSelector } from "@reduxjs/toolkit";

// Basic selectors
export const selectPosts = (state) => state.posts.posts;
export const selectSearch = (state) => state.posts.search;
export const selectFilter = (state) => state.posts.filter;

// Memoized selector
export const selectFilteredPosts = createSelector(
  [selectPosts, selectSearch, selectFilter],
  (posts, search, filter) => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || post.platform === filter;

      return matchesSearch && matchesFilter;
    });
  }
);

// Derived state
export const selectTotalLikes = createSelector(
  [selectPosts],
  (posts) => posts.reduce((sum, post) => sum + post.likes, 0)
);

export const selectTotalPosts = createSelector(
  [selectPosts],
  (posts) => posts.length
);