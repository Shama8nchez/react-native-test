import React, { useEffect } from 'react';

import { SafeAreaView, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { getPostsThunk } from '../../store/post-slice';
import { Form } from '../ui/Form/Form';
import { Card } from '../ui/Card/Card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },

  title: {
    fontSize: 20,
    margin: 5,
    marginBottom: 10,
  },

  postContainer: {
    marginBottom: 15,
  },

  navigateTo: {
    marginRight: 5,
    fontSize: 16,
    textAlign: 'right',
    color: '#1111EE',
    textDecorationLine: 'underline',
  },
});

export function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const listOfPosts = useSelector(state => state.posts.posts);

  useEffect(() => {
    dispatch(getPostsThunk()).catch(error => Alert.alert('Error', error.message));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Form />
          <Text style={styles.title}>List of posts:</Text>
          {listOfPosts?.map(post => (
            <View key={post.id} style={styles.postContainer}>
              <Card post={post} />
              <Text
                onPress={() => navigation.navigate('Post', { id: post.id })}
                style={styles.navigateTo}
              >
                SHOW MORE
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
