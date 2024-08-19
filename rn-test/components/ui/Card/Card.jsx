import React, { useState } from 'react';

import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from './Post/Post';
import { CommentSection } from './CommentSection/CommentSection';
import { getCommentsThunk } from '../../../store/comment-slice';

const styles = StyleSheet.create({
  post: {
    margin: 5,
    padding: 5,
    borderColor: '#444444',
    borderStyle: 'solid',
    borderWidth: 1,
  },
});

export function Card({ post }) {
  const dispatch = useDispatch();
  const [isShownComments, setIsShownComments] = useState(false);
  const comments = useSelector(state => state.comments.comments[post?.id]);

  const showComments = () => {
    if (!comments) dispatch(getCommentsThunk(post.id));
    setIsShownComments(!isShownComments);
  };

  return (
    <TouchableWithoutFeedback onPress={showComments}>
      <View style={styles.post}>
        <Post post={post} />
        <View style={{ height: isShownComments ? 'auto' : 0, overflow: 'hidden', paddingTop: 20 }}>
          <CommentSection post={post} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Card;
