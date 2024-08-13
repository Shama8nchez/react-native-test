import React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../store/post-slice';

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
  return (
    <View style={styles.post}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text>{post.body}</Text>
      <Button title="Delete" onPress={() => dispatch(deletePost(post.id))} />
    </View>
  );
}

export default Post;
