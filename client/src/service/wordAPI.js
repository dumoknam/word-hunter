import jwtAxios from './jwtAxios';

const insertWord = (token, enterWordData) => {
  return jwtAxios(token).post('/api/word', {
    params: enterWordData,
  });
};

export default {
  async enterWord(store, enterWordData) {
    try {
      const p = await insertWord(store.getters.getAccessToken, enterWordData);
      const response = await p;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};
