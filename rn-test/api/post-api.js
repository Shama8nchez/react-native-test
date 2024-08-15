import { ERROR_MESSAGE, RESPONSE_CODE, SERVER_URL } from './constants';

export const postAPI = {
  async getPosts() {
    const response = await fetch(`${SERVER_URL}/posts`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      const data = await response.json();
      return data;
    }
    throw new Error(`${response.status}. ${ERROR_MESSAGE.GET}`);
  },

  async createPost(body) {
    const response = await fetch(`${SERVER_URL}/posts`, {
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
    throw new Error(`${response.status}. ${ERROR_MESSAGE.CREATE}`);
  },

  async deletePost(id) {
    const response = await fetch(`${SERVER_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (response.status === RESPONSE_CODE.SUCCESS) {
      return { id };
    }
    throw new Error(`${response.status}. ${ERROR_MESSAGE.DELETE}`);
  },

  async editPost(id, body) {
    const response = await fetch(`${SERVER_URL}/posts/${id}`, {
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
    throw new Error(`${response.status}. ${ERROR_MESSAGE.EDIT}`);
  },
};

export default postAPI;
