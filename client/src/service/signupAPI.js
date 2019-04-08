import jwtAxios from './jwtAxios';

const createUser = (signupData) => {
  return jwtAxios().post('/api/signup', {
    params: {
      name: signupData.name,
      password: signupData.password,
      nickname: signupData.nickname,
      email: signupData.email,
    },
  });
};

const idcheck = (name) => {
  return jwtAxios().get(`/api/idcheck/${name}`);
};

export default {
  async signup(signupData) {
    try {
      const p = await createUser(signupData);
      const [response] = await Promise.all([p]);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  async idcheck(name) {
    try {
      const p = await idcheck(name);
      const response = await p;
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
