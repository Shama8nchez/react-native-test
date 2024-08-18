import React, { useState } from 'react';

import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { deletePost, deletePostThunk, editPost, editPostThunk } from '../../store/post-slice';
import { MESSAGE } from '../../api/constants';

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

export function Post({ post }) {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [isEditable, setIsEditable] = useState(false);
  const [isShownComments, setIsShownComments] = useState(false);

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

  const handleEditPost = () => {
    dispatch(editPostThunk(post.id)).catch(error =>
      Alert.alert('Error', `${error.message} ${MESSAGE.HANDLE_EDIT}`, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => dispatch(editPost({ id: post.id })) },
      ]),
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => setIsShownComments(!isShownComments)}>
      <View style={styles.post}>
        <TextInput
          style={{ ...styles.postTitle, color: '#000', borderWidth: isEditable ? 1 : 0 }}
          onChangeText={setTitle}
          value={title}
          editable={isEditable}
        />
        <TextInput
          style={{ ...styles.postBody, color: '#000', borderWidth: isEditable ? 1 : 0 }}
          onChangeText={setBody}
          value={body}
          multiline
          editable={isEditable}
        />
        <View style={styles.buttonContainer}>
          {isEditable ? (
            <Button title="Save" onPress={handleEditPost} />
          ) : (
            <Button title="Edit" onPress={() => setIsEditable(true)} />
          )}
          <Button title="Delete" onPress={handleDeletePost} />
        </View>
        <View style={{ height: isShownComments ? 'auto' : 0, overflow: 'hidden', transition: 0.3 }}>
          <Text style={styles.postTitle}>Comments:</Text>
          <View style={styles.commentForm}>
            <TextInput
              style={{ ...styles.commentInput, color: '#000', borderWidth: 1 }}
              onChangeText={setTitle}
              value={title}
              editable={isEditable}
            />
            <Button title="Send" onPress={handleDeletePost} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Post;
