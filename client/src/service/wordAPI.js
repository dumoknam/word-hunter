import jwtAxios from './jwtAxios';

const createWordAPI = (token, createWordData) => {
  return jwtAxios(token).post('/api/word', {
    params: createWordData,
  });
};

const readWordListAPI = (token) => {
  return jwtAxios(token).get('/api/word');
};

const readWordAPI = (token, keyword) => {
  return jwtAxios(token).get(`/api/word/${keyword}`);
};

const updateWordAPI = (token, updateWordData) => {
  return jwtAxios(token).put('/api/word', {
    params: updateWordData,
  });
};

const deleteWordAPI = (token, wordId, isMemorized) => {
  return jwtAxios(token).delete(`/api/word/${wordId}/${isMemorized}`);
};

const getExamQuestionAPI = (token, type) => {
  return jwtAxios(token).get(`/api/exam/${type}`);
};

const increaseWordScoreAPI = (token, wordId) => {
  return jwtAxios(token).put('/api/word/score/increase', {
    params: { wordId },
  });
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
  async readWord(store, keyword) {
    try {
      const p = await readWordAPI(store.getters.getAccessToken, keyword);
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
  async deleteWord(store, wordId, isMemorized) {
    try {
      const p = await deleteWordAPI(store.getters.getAccessToken, wordId, isMemorized);
      const response = await p;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getExamQuestion(store, type) {
    try {
      const p = await getExamQuestionAPI(store.getters.getAccessToken, type);
      const response = await p;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async increaseWordScore(store, wordId) {
    try {
      const p = await increaseWordScoreAPI(store.getters.getAccessToken, wordId);
      const response = await p;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};
