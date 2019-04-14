import jwtAxios from './jwtAxios';

const createWordAPI = (token, createWordData) => {
  return jwtAxios(token).post('/api/word', {
    params: createWordData,
  });
};

const readWordListAPI = (token) => {
  return jwtAxios(token).get('/api/word');
};

const updateWordAPI = (token, updateWordData) => {
  return jwtAxios(token).put('/api/word', {
    params: updateWordData,
  });
};

const deleteWordAPI = (token, wordId) => {
  return jwtAxios(token).delete(`/api/word/${wordId}`);
};

export default {
  async createWord(store, createWordData) {
    try {
      const p = await createWordAPI(store.getters.getAccessToken, createWordData);
      const response = await p;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async readWordList(store) {
    try {
      const p = await readWordListAPI(store.getters.getAccessToken);
      const response = await p;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async updateWord(store, updateWordData) {
    try {
      const p = await updateWordAPI(store.getters.getAccessToken, updateWordData);
      const response = await p;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async deleteWord(store, wordId) {
    try {
      const p = await deleteWordAPI(store.getters.getAccessToken, wordId);
      const response = await p;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};
