import React, { useState } from 'react';

import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { createPostThunk } from '../../store/post-slice';

const styles = StyleSheet.create({
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
});

export function Form() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();

  return (
    <View style={styles.form}>
      <Text style={styles.title}>React Native App</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Title"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Body"
        multiline
        numberOfLines={3}
        onChangeText={setBody}
        value={body}
      />
      <Button
        title="Create post"
        onPress={() => dispatch(createPostThunk({ id: Date.now(), title, body }))}
      />
    </View>
  );
}

export default Form;
