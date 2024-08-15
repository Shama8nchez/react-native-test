import React, { useState } from 'react';

import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, deletePostThunk, editPost, editPostThunk } from '../../store/post-slice';

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
});

export function Post({ post }) {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [isEditable, setIsEditable] = useState(false);

  const dispatch = useDispatch();
  const postsIds = useSelector(state => state.posts.postsIds);

  const handleDeletePost = () => {
    if (postsIds?.includes(post.id)) dispatch(deletePostThunk(post.id));
    else dispatch(deletePost({ id: post.id }));
  };

  const handleEditPost = () => {
    if (postsIds?.includes(post.id)) dispatch(editPostThunk(post.id));
    else dispatch(editPost({ id: post.id }));
    setIsEditable(false);
  };

  return (
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
        {!isEditable && <Button title="Edit" onPress={() => setIsEditable(true)} />}
        {isEditable && <Button title="Save" onPress={handleEditPost} />}
        <Button title="Delete" onPress={handleDeletePost} />
      </View>
    </View>
  );
}

export default Post;
