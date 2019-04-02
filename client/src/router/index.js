import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/spa/Login/Login';
import SignUp from '@/spa/SignUp/SignUp';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
  ],
});
