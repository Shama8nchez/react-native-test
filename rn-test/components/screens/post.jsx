import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },

  title: {
    fontSize: 20,
    marginBottom: 10,
  },

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

export function PostScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PostScreen</Text>
    </View>
  );
}

export default PostScreen;
