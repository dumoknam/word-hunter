export default {
  getUid: (state) => { return state.name; },
  getErrorState: (state) => { return state.errorState; },
  getIsAuth: (state) => { return state.isAuth; },
};
