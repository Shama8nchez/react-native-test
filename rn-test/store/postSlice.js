/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postAPI } from '../api/post-api';

export const getPosts = createAsyncThunk('posts/getPosts', postAPI.getPosts);

export const createPost = createAsyncThunk('posts/createPost', postAPI.createPost);

const initialState = {
  posts: [],
  isLoading: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getPosts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(getPosts.rejected, state => {
        state.isLoading = false;
        throw new Error('Something is wrong. Try later.');
      })
      .addCase(createPost.pending, state => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createPost.rejected, state => {
        state.isLoading = false;
        throw new Error('Something is wrong. Try later.');
      });
  },
});

export default postsSlice.reducer;
