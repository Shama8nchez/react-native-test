import React, { useState } from 'react';

import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { MESSAGE } from '../../../../../api/constants';
import {
  deleteComment,
  deleteCommentThunk,
  editComment,
  editCommentThunk,
} from '../../../../../store/comment-slice';

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
    marginBottom: 10,
  },

  commentInput: {
    padding: 5,
    marginBottom: 10,
  },

  comment: {
    paddingTop: 5,
    paddingBottom: 15,
    borderColor: '#444444',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
});

export function Comment({ comment }) {
  const [isEditable, setIsEditable] = useState(false);
  const [text, setText] = useState(comment.text);

  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    dispatch(deleteCommentThunk({ id: comment.id, postId: comment.postId })).catch(error =>
      Alert.alert('Error', `${error.message} ${MESSAGE.HANDLE_DELETE_COMMENT}`, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => dispatch(deleteComment({ id: comment.id, postId: comment.postId })),
        },
      ]),
    );
  };

  const handleSaveComment = () => {
    dispatch(editCommentThunk({ id: comment.id, postId: comment.postId, text }))
      .catch(error =>
        Alert.alert('Error', `${error.message} ${MESSAGE.HANDLE_EDIT_COMMENT}`, [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => setText(comment.text),
          },
          {
            text: 'OK',
            onPress: () => dispatch(editComment({ id: comment.id, postId: comment.postId, text })),
          },
        ]),
      )
      .finally(() => setIsEditable(false));
  };

  return (
    <View style={styles.comment}>
      {isEditable ? (
        <TextInput
          style={{ ...styles.commentInput, color: '#000', borderWidth: 1 }}
          onChangeText={setText}
          value={text}
        />
      ) : (
        <Text style={styles.commentInput}>{text}</Text>
      )}
      <View style={styles.buttonContainer}>
        {isEditable ? (
          <View style={{ ...styles.buttonContainer, gap: 5 }}>
            <Button title="Save" onPress={handleSaveComment} />
            <Button
              title="Cancel"
              onPress={() => {
                setText(comment.text);
                setIsEditable(false);
              }}
            />
          </View>
        ) : (
          <Button title="Edit" onPress={() => setIsEditable(true)} />
        )}
        <Button title="Delete" onPress={handleDeleteComment} />
      </View>
    </View>
  );
}

export default Comment;
