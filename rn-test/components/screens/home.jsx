import React, { useEffect } from 'react';

import { StyleSheet, Text, View, Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { getPostsThunk } from '../../store/post-slice';
import { Form } from '../ui/form';
import { Post } from '../ui/post';

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

export function Home() {
  const dispatch = useDispatch();
  const listOfPosts = useSelector(state => state.posts.posts);

  useEffect(() => {
    dispatch(getPostsThunk()).catch(error => Alert.alert(error.message));
  }, []);

  return (
    <View style={styles.container}>
      <Form />
      <Text style={styles.title}>List of posts:</Text>
      {listOfPosts?.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </View>
  );
}

export default Home;
