import jwtAxios from './jwtAxios';

const updateWordMeanAPI = (token, updateWordMeanData) => {
  return jwtAxios(token).put('/api/mean', {
    params: updateWordMeanData,
  });
};

const deleteWordMeanAPI = (token, meanId) => {
  return jwtAxios(token).delete(`/api/mean/${meanId}`);
};

export default {
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
