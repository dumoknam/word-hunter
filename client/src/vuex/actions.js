import { NAME, IS_AUTH, ERROR_STATE } from './mutation_type';
import api from '../service';

const setNAME = ({ commit }, data) => {
  commit(NAME, data);
};

const setErrorState = ({ commit }, data) => {
  commit(ERROR_STATE, data);
};

const setIsAuth = ({ commit }, data) => {
  commit(IS_AUTH, data);
};

// 백엔드에서 반환한 결과값을 가지고 로그인 성공 실패 여부를 vuex에 넣어준다.
const processResponse = (store, loginResponse) => {
  switch (loginResponse) {
    case 'noAuth':
      setErrorState(store, 'Wrong name or Password');
      setIsAuth(store, false);
      break;
    default:
      setNAME(store, loginResponse.NAME);
      setErrorState(store, '');
      setIsAuth(store, true);
  }
};

export default {
  async login(store, loginData) {
    /* 로그인은 백엔드에 다녀와야 해서 비동기로 처리한다 */
    const loginResponse = await api.login(loginData.name, loginData.password);
    processResponse(store, loginResponse);
    return store.getters.getIsAuth; // 로그인 결과를 리턴한다.
  },
  // async signup() {
  // },
};
