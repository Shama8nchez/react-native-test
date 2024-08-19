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

  async getPost(id) {
    const response = await fetch(`${SERVER_URL}/posts/${id}`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      const data = await response.json();
      return data;
    }
    throw new Error(`${ERROR_MESSAGE.NO_POST}`);
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
    throw new Error(`${response.status}. ${ERROR_MESSAGE.CREATE_POST}`);
  },

  async deletePost(id) {
    const response = await fetch(`${SERVER_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (response.status === RESPONSE_CODE.SUCCESS) {
      return { id };
    }
    throw new Error(`${response.status}. ${ERROR_MESSAGE.DELETE_POST}`);
  },

  async editPost(body) {
    const response = await fetch(`${SERVER_URL}/posts/${body.id}`, {
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
    throw new Error(`${response.status}. ${ERROR_MESSAGE.EDIT_POST}`);
  },
};

export default postAPI;
