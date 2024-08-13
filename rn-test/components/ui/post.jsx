import React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, deletePostThunk } from '../../store/post-slice';

const styles = StyleSheet.create({
  post: {
    margin: 5,
    padding: 5,
    borderColor: '#444444',
    borderStyle: 'solid',
    borderWidth: 1,
  },

  postTitle: {
    fontWeight: 'bold',
  },
});

export function Post({ post }) {
  const dispatch = useDispatch();
  const postsIds = useSelector(state => state.posts.postsIds);

  const handleDeletePost = () => {
    if (postsIds?.includes(post.id)) dispatch(deletePostThunk(post.id));
    else dispatch(deletePost({ id: post.id }));
  };

  return (
    <View style={styles.post}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text>{post.body}</Text>
      <Button title="Delete" onPress={handleDeletePost} />
    </View>
  );
}

export default Post;
