import jwtAxios from './jwtAxios';

const createUserAPI = (signupData) => {
  return jwtAxios().post('/api/signup', {
    params: signupData,
  });
};

const idcheckAPI = (name) => {
  return jwtAxios().get(`/api/idcheck/${name}`);
};

export default {
  async signup(signupData) {
    try {
      const p = await createUserAPI(signupData);
      const [response] = await Promise.all([p]);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  async idcheck(name) {
    try {
      const p = await idcheckAPI(name);
      const response = await p;
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
