import { ACCESS_TOKEN, IS_AUTH, API_RESPONSE_MESSAGE } from './mutation_type';
import loginAPI from '../service/loginAPI';
import signupAPI from '../service/signupAPI';
import wordAPI from '../service/wordAPI';

const setAccessToken = ({ commit }, token) => {
  commit(ACCESS_TOKEN, token);
};

const setIsAuth = ({ commit }, isAuth) => {
  commit(IS_AUTH, isAuth);
};

const setApiResponseMessage = ({ commit }, message) => {
  commit(API_RESPONSE_MESSAGE, message);
};

export default {
  // 로그인
  async login(store, loginData) {
    try {
      const response = await loginAPI.login(loginData);
      let isSuccess = false;
      setApiResponseMessage(store, response.message);
      if (response.success) {
        setAccessToken(store, response.data.token);
        setIsAuth(store, true);
        isSuccess = true;
      } else {
        setIsAuth(store, false);
      }
      return isSuccess;
    } catch (error) {
      throw new Error(error);
    }
  },
  // 로그아웃
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isAuth');
    return true;
  },
  // 회원가입
  async signup(store, signupData) {
    try {
      const response = await signupAPI.signup(signupData);
      setApiResponseMessage(store, response.message);
      return response.success;
    } catch (error) {
      throw new Error(error);
    }
  },
  // 아이디 중복체크
  async idcheck(store, name) {
    try {
      const response = await signupAPI.idcheck(name);
      return response.data.isDuplicated;
    } catch (error) {
      throw new Error(error);
    }
  },
  // api test
  async test(store) {
    try {
      const response = await wordAPI.test(store);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};
