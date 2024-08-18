import React, { useState } from 'react';

import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { deletePost, deletePostThunk } from '../../../../store/post-slice';
import { MESSAGE } from '../../../../api/constants';

const styles = StyleSheet.create({
  post: {
    margin: 5,
    padding: 5,
    borderColor: '#444444',
    borderStyle: 'solid',
    borderWidth: 1,
  },

  postTitle: {
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: '#111111',
    borderStyle: 'solid',
    fontWeight: 'bold',
  },

  postBody: {
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: '#111111',
    borderStyle: 'solid',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  commentForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  commentInput: {
    width: '75%',
    padding: 5,
  },
});

export function Comment({ post }) {
  const [title, setTitle] = useState(post.title);

  const dispatch = useDispatch();

  const handleDeletePost = () => {
    dispatch(deletePostThunk(post.id)).catch(error =>
      Alert.alert('Error', `${error.message} ${MESSAGE.HANDLE_DELETE}`, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => dispatch(deletePost({ id: post.id })) },
      ]),
    );
  };

  return (
    <>
      <Text style={styles.postTitle}>Comments:</Text>
      <View style={styles.commentForm}>
        <TextInput
          style={{ ...styles.commentInput, color: '#000', borderWidth: 1 }}
          onChangeText={setTitle}
          value={title}
        />
        <Button title="Send" onPress={handleDeletePost} />
      </View>
    </>
  );
}

export default Comment;
