import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TPost } from "../types";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostBySlug,
  updatePost,
} from "./asyncActions";

const postsSlice = createSlice({
  name: "reviews",
  initialState: {
    posts: [] as TPost[],
    currentPost: {} as TPost,
    loading: false,
    error: false,
  },

  reducers: {
    setCurrentPost(state, action: PayloadAction<TPost>) {
      state.currentPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    //Get all posts
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;

      state.loading = false;
      state.error = false;
    });
    builder.addCase(getAllPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPosts.rejected, (state) => {
      state.error = true;
    });

    //Get post by Id
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.currentPost = action.payload.post;
      console.log(state.currentPost);
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getPostById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPostById.rejected, (state) => {
      state.error = true;
    });

    builder.addCase(getPostBySlug.fulfilled, (state, action) => {
      state.currentPost = action.payload as TPost;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getPostBySlug.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPostBySlug.rejected, (state) => {
      state.error = true;
    });

    //Create post
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPost.rejected, (state) => {
      state.error = true;
    });

    //Update post
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePost.rejected, (state) => {
      state.error = true;
    });

    //Delete post
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePost.rejected, (state) => {
      state.error = true;
    });
  },
});

export const { setCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;
