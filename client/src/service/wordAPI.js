import jwtAxios from './jwtAxios';

const createWord = (token, enterWordData) => {
  return jwtAxios(token).post('/api/word', {
    params: enterWordData,
  });
};

const readWordList = (token) => {
  return jwtAxios(token).get('/api/word');
};

export default {
  async enterWord(store, enterWordData) {
    try {
      const p = await createWord(store.getters.getAccessToken, enterWordData);
      const response = await p;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getWordList(store) {
    try {
      const p = await readWordList(store.getters.getAccessToken);
      const response = await p;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};
