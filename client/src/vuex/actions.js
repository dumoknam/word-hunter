import { ACCESS_TOKEN, IS_AUTH, API_RESPONSE_MESSAGE } from './mutation_type';
import userAPI from '../service/userAPI';
import signupAPI from '../service/signupAPI';
import wordAPI from '../service/wordAPI';
import wordMeanAPI from '../service/wordMeanAPI';

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
      const response = await userAPI.login(loginData);
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
  async readStudyHistory(store) {
    try {
      const response = await userAPI.readStudyHistory(store);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
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
  // 단어 등록
  async createWord(store, enterWordData) {
    try {
      const response = await wordAPI.createWord(store, enterWordData);
      return response.data.success;
    } catch (error) {
      throw new Error(error);
    }
  },
  // 단어 목록 조회
  async readWordList(store) {
    try {
      const response = await wordAPI.readWordList(store);
      return response.data.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  // 단어 검색
  async readWord(store, keyword) {
    try {
      const response = await wordAPI.readWord(store, keyword);
      return response.data.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  // 단어 수정
  async updateWord(store, updateWordData) {
    try {
      const response = await wordAPI.updateWord(store, updateWordData);
      return response.data.success;
    } catch (error) {
      throw new Error(error);
    }
  },
  // 단어 삭제
  async deleteWord(store, deleteData) {
    try {
      const response = await wordAPI.deleteWord(store, deleteData.wordId, deleteData.isMemorized);
      return response.data.success;
    } catch (error) {
      throw new Error(error);
    }
  },
  // 단어 퀴즈 조회
  async getExamQuestion(store, type) {
    try {
      const response = await wordAPI.getExamQuestion(store, type);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  // 단어 스코어 증가
  async increaseWordScore(store, wordId) {
    try {
      const response = await wordAPI.increaseWordScore(store, wordId);
      return response.data.success;
    } catch (error) {
      throw new Error(error);
    }
  },
  // 단어 뜻 추가
  async insertWordMean(store, insertWordMeanData) {
    try {
      const response = await wordMeanAPI.insertWordMean(store, insertWordMeanData);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  // 단어 의미 수정
  async updateWordMean(store, updateWordMeanData) {
    try {
      const response = await wordMeanAPI.updateWordMean(store, updateWordMeanData);
      return response.data.success;
    } catch (error) {
      throw new Error(error);
    }
  },
  // 단어 의미 삭제
  async deleteWordMean(store, meanId) {
    try {
      const response = await wordMeanAPI.deleteWordMean(store, meanId);
      return response.data.success;
    } catch (error) {
      throw new Error(error);
    }
  },
};
