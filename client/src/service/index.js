import loginAPI from './loginAPI';

// 모든 서비스를 관리하는 곳
export default {
  async login(name, password) {
    try {
      const loginResponse = await loginAPI.login(name, password);
      return loginResponse;
    } catch (err) {
      // console.error(err);
      throw new Error(err);
    }
  },
};
