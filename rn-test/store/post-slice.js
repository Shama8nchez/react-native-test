/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postAPI } from '../api/post-api';

export const getPostsThunk = createAsyncThunk('posts/getPosts', postAPI.getPosts);

export const createPostThunk = createAsyncThunk('posts/createPost', postAPI.createPost);

export const deletePostThunk = createAsyncThunk('posts/deletePost', postAPI.deletePost);

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
        state.postsIds = action.payload.map(post => post.id);
        state.isLoading = false;
      })
      .addCase(getPostsThunk.rejected, state => {
        state.isLoading = false;
        throw new Error('Something is wrong. Try later.');
      })
      .addCase(createPostThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createPostThunk.rejected, state => {
        state.isLoading = false;
        throw new Error('Something is wrong. Try later.');
      })
      .addCase(deletePostThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload.id);
        state.isLoading = false;
      })
      .addCase(deletePostThunk.rejected, state => {
        state.isLoading = false;
        throw new Error('Something is wrong. Try later.');
      });
  },
  reducers: {
    deletePost(state, action) {
      state.posts = state.posts.filter(post => post.id !== action.payload.id);
    },
  },
});

export const { deletePost } = postsSlice.actions;

export default postsSlice.reducer;
