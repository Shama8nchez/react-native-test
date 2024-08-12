/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postsAPI } from '../api/posts-api';

export const getPosts = createAsyncThunk('posts/getPosts', postsAPI.getPosts);

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
      });
  },
});

export default postsSlice.reducer;
