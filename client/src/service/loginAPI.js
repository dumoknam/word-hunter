import axios from 'axios';

/**
 * 사용자 정보 조회
 * @param {*} name 사용자 아이디
 * @param {*} password 사용자 비밀번호
 */
const getUserInfo = (name, password) => {
  return axios.post('/api/login', {
    params: {
      name,
      password,
    },
  });
};

export default {
  async login(name, password) {
    try {
      const getUserInfoPromise = await getUserInfo(name, password);
      const [userInfoResponse] = await Promise.all([getUserInfoPromise]);
      if (userInfoResponse.length === 0) return 'noAuth'; // 로그인 실패
      return userInfoResponse;
    } catch (err) {
      throw new Error(err);
    }
  },
};
