import jwtAxios from './jwtAxios';

/**
 * 사용자 정보 조회
 * @param {*} name 사용자 아이디
 * @param {*} password 사용자 비밀번호
 */
const getUserInfo = (loginData) => {
  return jwtAxios().post('/api/login', {
    params: {
      name: loginData.name,
      password: loginData.password,
    },
  });
};

export default {
  async login(loginData) {
    try {
      const p = await getUserInfo(loginData);
      const [response] = await Promise.all([p]);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
