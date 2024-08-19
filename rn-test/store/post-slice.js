/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postAPI } from '../api/post-api';

export const getPostThunk = createAsyncThunk('posts/getPost', postAPI.getPost);

export const getPostsThunk = createAsyncThunk('posts/getPosts', postAPI.getPosts);

export const createPostThunk = createAsyncThunk('posts/createPost', postAPI.createPost);

export const deletePostThunk = createAsyncThunk('posts/deletePost', postAPI.deletePost);

export const editPostThunk = createAsyncThunk('posts/editPost', postAPI.editPost);

const initialState = {
  post: null,
  posts: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getPostThunk.pending, state => {
        state.post = null;
      })
      .addCase(getPostThunk.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(getPostThunk.rejected, action => {
        throw new Error(action.error.message);
      })
      .addCase(getPostsThunk.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getPostsThunk.rejected, action => {
        throw new Error(action.error.message);
      })
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(createPostThunk.rejected, action => {
        throw new Error(action.error.message);
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload.id);
      })
      .addCase(deletePostThunk.rejected, action => {
        throw new Error(action.error.message);
      })
      .addCase(editPostThunk.fulfilled, (state, action) => {
        state.posts[state.posts.map(item => item.id).indexOf(action.payload.id)] = action.payload;
      })
      .addCase(editPostThunk.rejected, action => {
        throw new Error(action.error.message);
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
