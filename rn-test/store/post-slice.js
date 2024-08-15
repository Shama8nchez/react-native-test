/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postAPI } from '../api/post-api';

export const getPostsThunk = createAsyncThunk('posts/getPosts', postAPI.getPosts);

export const createPostThunk = createAsyncThunk('posts/createPost', postAPI.createPost);

export const deletePostThunk = createAsyncThunk('posts/deletePost', postAPI.deletePost);

export const editPostThunk = createAsyncThunk('posts/editPost', postAPI.editPost);

const initialState = {
  posts: [],
  isLoading: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getPostsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getPostsThunk.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(getPostsThunk.rejected, (state, payload) => {
        state.isLoading = false;
        throw new Error(payload.error.message);
      })
      .addCase(createPostThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createPostThunk.rejected, (state, payload) => {
        state.isLoading = false;
        throw new Error(payload.error.message);
      })
      .addCase(deletePostThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload.id);
        state.isLoading = false;
      })
      .addCase(deletePostThunk.rejected, (state, payload) => {
        state.isLoading = false;
        throw new Error(payload.error.message);
      })
      .addCase(editPostThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(editPostThunk.fulfilled, (state, action) => {
        state.posts[state.posts.map(item => item.id).indexOf(action.payload.id)] = action.payload;
        state.isLoading = false;
      })
      .addCase(editPostThunk.rejected, (state, payload) => {
        state.isLoading = false;
        throw new Error(payload.error.message);
      });
  },
  reducers: {
    deletePost(state, action) {
      state.posts = state.posts.filter(post => post.id !== action.payload.id);
    },
    editPost(state, action) {
      state.posts[state.posts.map(item => item.id).indexOf(action.payload.id)] = action.payload;
    },
  },
});

export const { deletePost, editPost } = postsSlice.actions;

export default postsSlice.reducer;
