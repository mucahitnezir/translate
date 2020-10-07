import Vue from 'vue';
import Router from 'vue-router';

import AuthGuard from './authGuard';

import Home from '@/views/Home.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login'),
      meta: {
        requiresNoAuth: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '../views/About'),
    },
    {
      path: '/profile',
      component: () => import(/* webpackChunkName: "profile" */ '../views/Profile'),
      children: [
        {
          path: '',
          name: 'profile',
          component: () => import(/* webpackChunkName: "profile-index" */ '../views/Profile/ProfileIndex'),
        },
        {
          path: 'edit',
          name: 'profile-edit',
          component: () => import(/* webpackChunkName: "profile-edit" */ '../views/Profile/ProfileEdit'),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
});

router.beforeEach(AuthGuard);

export default router;
