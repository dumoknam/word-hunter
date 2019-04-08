import jwtAxios from './jwtAxios';

const test = (token) => {
  return jwtAxios(token).post('/api/word');
};

export default {
  async test(store) {
    try {
      const p = await test(store.getters.getAccessToken);
      const response = await p;
      console.log('API CALL!!!');
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};
