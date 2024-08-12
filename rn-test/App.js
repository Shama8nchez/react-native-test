import React, { useEffect, useState } from 'react';

import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { postsAPI } from './api/get-posts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },

  form: {
    marginBottom: 15,
  },

  title: {
    fontSize: 20,
    marginBottom: 10,
  },

  textInput: {
    padding: 5,
    marginBottom: 10,
    borderColor: '#111111',
    borderStyle: 'solid',
    borderWidth: 1,
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

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postsAPI
      .getPosts()
      .then(result => setPosts(result))
      .catch(error => Alert.alert(error.message));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>React Native App</Text>
        <TextInput style={styles.textInput} placeholder="Title" />
        <TextInput style={styles.textInput} placeholder="Body" multiline numberOfLines={3} />
        <Button title="Create post" onPress={() => Alert.alert('Simple Button pressed')} />
      </View>
      <View>
        <Text style={styles.title}>List of posts:</Text>
        {posts?.map(post => (
          <View style={styles.post} key={post.id}>
            <Text style={styles.postTitle}>{post?.title}</Text>
            <Text>{post?.body}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
