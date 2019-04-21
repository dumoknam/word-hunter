import jwtAxios from './jwtAxios';

/**
 * 사용자 정보 조회
 * @param {*} name 사용자 아이디
 * @param {*} password 사용자 비밀번호
 */
const readUserAPI = (loginData) => {
  return jwtAxios().post('/api/login', {
    params: loginData,
  });
};

const readStudyHistoryAPI = (token) => {
  return jwtAxios(token).get('/api/history');
};

export default {
  async login(loginData) {
    try {
      const p = await readUserAPI(loginData);
      const [response] = await Promise.all([p]);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  async readStudyHistory(store) {
    try {
      const p = await readStudyHistoryAPI(store.getters.getAccessToken);
      const response = await p;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
};
