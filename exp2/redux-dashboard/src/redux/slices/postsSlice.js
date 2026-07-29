import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );

    const data = await response.json();

    return data.map((post) => ({
      ...post,
      platform: "Instagram",
      likes: Math.floor(Math.random() * 100),
    }));
  }
);

const initialState = {
  posts: [],
  loading: false,
  error: null,
  search: "",
  filter: "All",
};

const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    editPost(state, action) {
  const { id, title, body } = action.payload;

  const post = state.posts.find((p) => p.id === id);

  if (post) {
    post.title = title;
    post.body = body;
  }
},
    addPost: {
      reducer(state, action) {
        state.posts.unshift(action.payload);
      },
      setSearch(state, action) {
  state.search = action.payload;
},

setFilter(state, action) {
  state.filter = action.payload;
},

      prepare(title, body, platform) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            platform,
            likes: 0,
          },
        };
      },
    },

    deletePost(state, action) {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },

    likePost(state, action) {
      const post = state.posts.find(
        (post) => post.id === action.payload
      );

      if (post) {
        post.likes++;
      }
    },
  },

  extraReducers(builder) {
    builder

      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to fetch posts";
      });
  },
});

export const {
  addPost,
  deletePost,
  likePost,
  editPost,
  setSearch,
  setFilter,
} = postsSlice.actions;

export default postsSlice.reducer;