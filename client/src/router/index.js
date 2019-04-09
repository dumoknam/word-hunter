import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/spa/Login/Login';
import SignUp from '@/spa/SignUp/SignUp';
import Main from '@/spa/Main/Main';
import EnterWord from '@/spa/WordContent/EnterWord';

Vue.use(Router);

const redirectMain = (from, to, next) => {
  if (localStorage.accessToken) return next('/main'); // isAuth === true면 메인
  return next();
};

// const requireAuth = (from, to, next) => {
//   if (localStorage.accessToken) return next(); // isAuth === true면 메인
//   return next('/'); // isAuth === false면 다시 로그인화면으로
// };

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      beforeEnter: redirectMain,
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
      // beforeEnter: requireAuth,
    },
    {
      path: '/enterword',
      name: 'EnterWord',
      component: EnterWord,
    },
  ],
});
