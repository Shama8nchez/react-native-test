import React, { useState } from 'react';

import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Post } from './Post/Post';
import { Comment } from './Comment/Comment';

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

export function Card({ post }) {
  const [isShownComments, setIsShownComments] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setIsShownComments(!isShownComments)}>
      <View style={styles.post}>
        <Post post={post} />
        <View style={{ height: isShownComments ? 'auto' : 0, overflow: 'hidden', transition: 0.3 }}>
          <Comment post={post} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Card;
