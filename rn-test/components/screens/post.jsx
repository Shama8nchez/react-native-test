import React, { useEffect, useState } from 'react';

import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPostThunk } from '../../store/post-slice';

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
});

export function PostScreen({ route }) {
  const dispatch = useDispatch();
  const post = useSelector(state => state.posts.post);
  const [error, setError] = useState();

  useEffect(() => {
    dispatch(getPostThunk(route.params.id)).catch(error_ => setError(error_.message));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          {error ? (
            <Text style={styles.title}>{error}</Text>
          ) : (
            <>
              <Text style={styles.title}>{post?.title}</Text>
              <Text style={styles.title}>{post?.body}</Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PostScreen;
