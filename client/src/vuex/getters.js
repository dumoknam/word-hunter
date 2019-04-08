export default {
  getAccessToken: (state) => { return state.auth.accessToken; },
  getIsAuth: (state) => { return state.auth.isAuth; },
  getApiResponseMessage: (state) => { return state.api.responseMessage; },
};
