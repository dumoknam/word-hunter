import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/spa/Login/Login';
import SignUp from '@/spa/SignUp/SignUp';
import Main from '@/spa/Main/Main';
import store from '@/vuex/store';

Vue.use(Router);

const requireAuth = (from, to, next) => {
  if (store.getters.getIsAuth) return next(); // isAuth === true면 메인
  return next('/'); // isAuth === false면 다시 로그인화면으로
};

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
    {
      path: '/main',
      name: 'Main',
      component: Main,
      beforeEnter: requireAuth,
    },
  ],
});
