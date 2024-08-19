import { ERROR_MESSAGE, RESPONSE_CODE } from './constants';

export const commentAPI = {
  async getComments(id) {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts/${id}/comments`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      const data = await response.json();
      return data;
    }
    throw new Error(`${response.status}. ${ERROR_MESSAGE.GET}`);
  },

  async createComment(body) {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (response.status === RESPONSE_CODE.CREATED) {
      const data = await response.json();
      return data;
    }
    throw new Error(`${response.status}. ${ERROR_MESSAGE.CREATE_COMMENT}`);
  },

  async deleteComment({ id, postId }) {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/comments/${id}`, {
      method: 'DELETE',
    });
    if (response.status === RESPONSE_CODE.SUCCESS) {
      return { id, postId };
    }
    throw new Error(`${response.status}. ${ERROR_MESSAGE.DELETE_COMMENT}`);
  },

  async editComment(body) {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/comments/${body.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (response.status === RESPONSE_CODE.SUCCESS) {
      const data = await response.json();
      return data;
    }
    throw new Error(`${response.status}. ${ERROR_MESSAGE.EDIT_COMMENT}`);
  },
};

export default commentAPI;
