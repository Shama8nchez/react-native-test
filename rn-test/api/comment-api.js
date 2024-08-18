import { ERROR_MESSAGE, RESPONSE_CODE, SERVER_URL } from './constants';

export const commentAPI = {
  async getComments(id) {
    const response = await fetch(`${SERVER_URL}/posts/${id}/comments`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      const data = await response.json();
      return data;
    }
    throw new Error(`${response.status}. ${ERROR_MESSAGE.GET}`);
  },

  async createComment(body) {
    const response = await fetch(`${SERVER_URL}/comments`, {
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

  async deleteComment(id) {
    const response = await fetch(`${SERVER_URL}/comments/${id}`, {
      method: 'DELETE',
    });
    if (response.status === RESPONSE_CODE.SUCCESS) {
      return { id };
    }
    throw new Error(`${response.status}. ${ERROR_MESSAGE.DELETE}`);
  },

  async editComment(id, body) {
    const response = await fetch(`${SERVER_URL}/comments/${id}`, {
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

export default commentAPI;
