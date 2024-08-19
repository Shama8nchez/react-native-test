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
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getCommentsThunk.fulfilled, (state, action) => {
        state.comments[action.meta.arg] = action.payload;
      })
      .addCase(getCommentsThunk.rejected, action => {
        throw new Error(action.error.message);
      })
      .addCase(createCommentThunk.fulfilled, (state, action) => {
        state.comments[action.payload.postId].push(action.payload);
      })
      .addCase(createCommentThunk.rejected, action => {
        throw new Error(action.error.message);
      })
      .addCase(deleteCommentThunk.fulfilled, (state, action) => {
        state.comments[action.payload.postId] = state.comments[action.payload.postId].filter(
          comment => comment.id !== action.payload.id,
        );
      })
      .addCase(deleteCommentThunk.rejected, action => {
        throw new Error(action.error.message);
      })
      .addCase(editCommentThunk.fulfilled, (state, action) => {
        state.comments[action.payload.postId][
          state.comments[action.payload.postId].map(item => item.id).indexOf(action.payload.id)
        ] = action.payload;
      })
      .addCase(editCommentThunk.rejected, action => {
        throw new Error(action.error.message);
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
