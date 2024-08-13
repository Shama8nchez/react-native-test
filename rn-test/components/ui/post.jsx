import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

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
  return (
    <View style={styles.post}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text>{post.body}</Text>
    </View>
  );
}

export default Post;
