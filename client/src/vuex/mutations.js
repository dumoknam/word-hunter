import * as types from './mutation_type';

export default {
  [types.NAME](state, name) {
    state.name = name;
  },
  [types.ERROR_STATE](state, errorState) {
    state.errorState = errorState;
  },
  [types.IS_AUTH](state, isAuth) {
    state.isAuth = isAuth;
  },
};
