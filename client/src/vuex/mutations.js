import * as types from './mutation_type';

export default {
  [types.ACCESS_TOKEN](state, token) {
    state.auth.accessToken = token;
    localStorage.accessToken = token;
  },
  [types.IS_AUTH](state, isAuth) {
    state.auth.isAuth = isAuth;
    localStorage.isAuth = isAuth;
  },
  [types.API_RESPONSE_MESSAGE](state, message) {
    state.api.responseMessage = message;
  },
};
