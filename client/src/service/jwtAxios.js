import axios from 'axios';

const jwtAxios = (token) => {
  const jwt = token || localStorage.accessToken;
  if (jwt) axios.defaults.headers['x-access-token'] = jwt;
  return axios;
};

export default jwtAxios;
