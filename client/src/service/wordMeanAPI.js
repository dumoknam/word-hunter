import jwtAxios from './jwtAxios';

const insertWordMeanAPI = (token, insertWordMeanData) => {
  return jwtAxios(token).post('/api/mean', {
    params: insertWordMeanData,
  });
};

const updateWordMeanAPI = (token, updateWordMeanData) => {
  return jwtAxios(token).put('/api/mean', {
    params: updateWordMeanData,
  });
};

const deleteWordMeanAPI = (token, meanId) => {
  return jwtAxios(token).delete(`/api/mean/${meanId}`);
};

export default {
  async insertWordMean(store, insertWordMeanData) {
    try {
      const p = await insertWordMeanAPI(store.getters.getAccessToken, insertWordMeanData);
      const response = await p;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async updateWordMean(store, updateWordMeanData) {
    try {
      const p = await updateWordMeanAPI(store.getters.getAccessToken, updateWordMeanData);
      const response = await p;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async deleteWordMean(store, meanId) {
    try {
      const p = await deleteWordMeanAPI(store.getters.getAccessToken, meanId);
      const response = await p;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};
