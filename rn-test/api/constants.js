export const SERVER_URL =
  'https://my-json-server.typicode.com/Shama8nchez/react-native-test-server';

export const RESPONSE_CODE = {
  SUCCESS: 200,
  CREATED: 201,
};

export const ERROR_MESSAGE = {
  GET: 'Something is wrong. Try later.',
  NO_POST: 'No post with such id on server',
  CREATE_POST: "Post wasn't created!",
  DELETE_POST: "Post wasn't deleted!",
  EDIT_POST: "Post wasn't edited!",
  CREATE_COMMENT: "Comment wasn't created!",
  DELETE_COMMENT: "Comment wasn't deleted!",
  EDIT_COMMENT: "Comment wasn't edited!",
};

export const MESSAGE = {
  HANDLE_DELETE_POST: 'Would you like to remove the post from the state anyway?',
  HANDLE_EDIT_POST: 'Would you like to edit the post in the state?',
  HANDLE_DELETE_COMMENT: 'Would you like to remove the comment from the state anyway?',
  HANDLE_EDIT_COMMENT: 'Would you like to edit the comment in the state?',
};

export default {
  SERVER_URL,
  RESPONSE_CODE,
  ERROR_MESSAGE,
  MESSAGE,
};
