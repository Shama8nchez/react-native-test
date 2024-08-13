import React, { useEffect } from 'react';

import { StyleSheet, Text, View, Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/postSlice';
import { Form } from '../ui/form';

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
    dispatch(getPosts()).catch(error => Alert.alert(error.message));
  }, []);

  return (
    <View style={styles.container}>
      <Form />
      <View>
        <Text style={styles.title}>List of posts:</Text>
        {listOfPosts?.map(post => (
          <View style={styles.post} key={post.id}>
            <Text style={styles.postTitle}>{post?.title}</Text>
            <Text>{post?.body}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default Home;
