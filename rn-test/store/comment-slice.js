/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { commentAPI } from '../api/comment-api';

export const getCommentsThunk = createAsyncThunk('comments/getComments', commentAPI.getComments);

export const createCommentThunk = createAsyncThunk(
  'comments/createComment',
  commentAPI.createComment,
);

export const deleteCommentThunk = createAsyncThunk(
  'comments/deleteComment',
  commentAPI.deleteComment,
);

export const editCommentThunk = createAsyncThunk('comments/editComment', commentAPI.editComment);

const initialState = {
  comments: {},
  isLoading: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getCommentsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCommentsThunk.fulfilled, (state, action) => {
        state.comments[action.meta.arg] = action.payload;
        state.isLoading = false;
      })
      .addCase(getCommentsThunk.rejected, (state, payload) => {
        state.isLoading = false;
        throw new Error(payload.error.message);
      })
      .addCase(createCommentThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(createCommentThunk.fulfilled, (state, action) => {
        state.comments[action.payload.postId].push(action.payload);
        state.isLoading = false;
      })
      .addCase(createCommentThunk.rejected, (state, payload) => {
        state.isLoading = false;
        throw new Error(payload.error.message);
      })
      .addCase(deleteCommentThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteCommentThunk.fulfilled, (state, action) => {
        state.comments[action.payload.postId] = state.comments[action.payload.postId].filter(
          comment => comment.id !== action.payload.id,
        );
        state.isLoading = false;
      })
      .addCase(deleteCommentThunk.rejected, (state, action) => {
        state.isLoading = false;
        throw new Error(action.error.message);
      })
      .addCase(editCommentThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(editCommentThunk.fulfilled, (state, action) => {
        state.comments[action.payload.postId][
          state.comments[action.payload.postId].map(item => item.id).indexOf(action.payload.id)
        ] = action.payload;
        state.isLoading = false;
      })
      .addCase(editCommentThunk.rejected, (state, payload) => {
        state.isLoading = false;
        throw new Error(payload.error.message);
      });
  },
  reducers: {
    deleteComment(state, action) {
      state.comments[action.payload.postId] = state.comments[action.payload.postId].filter(
        comment => comment.id !== action.payload.id,
      );
    },
    editComment(state, action) {
      state.comments[action.payload.postId][
        state.comments[action.payload.postId].map(item => item.id).indexOf(action.payload.id)
      ] = action.payload;
    },
  },
});

export const { deleteComment, editComment } = commentsSlice.actions;

export default commentsSlice.reducer;
