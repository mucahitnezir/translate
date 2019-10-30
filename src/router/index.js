import Vue from 'vue';
import Router from 'vue-router';

import AuthGuard from './authGuard';

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import About from '../views/About.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresNoAuth: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
});

router.beforeEach(AuthGuard);

export default router;
