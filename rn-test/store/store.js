import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './post-slice';
import commentsReducer from './comment-slice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export default store;
