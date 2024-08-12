import { RESPONSE_CODE, SERVER_URL } from './constants';

export const postAPI = {
  async getPosts() {
    const response = await fetch(`${SERVER_URL}/posts`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      const data = await response.json();
      return data;
    }
    throw new Error('Something wrong');
  },
};

export default postAPI;
