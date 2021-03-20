import Vue from 'vue';
import Router from 'vue-router';

import AuthGuard from './authGuard';

import Home from '@/views/Home.vue';
import NotFound from '@/views/NotFound.vue';
import TranslateHistory from '@/views/TranslateHistory.vue';
import SavedTranslations from '@/views/SavedTranslations.vue';

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
      path: '/history',
      name: 'history',
      components: {
        default: Home,
        right: TranslateHistory,
      },
    },
    {
      path: '/saved',
      name: 'saved',
      components: {
        default: Home,
        right: SavedTranslations,
      },
    },
    {
      path: '/auth',
      component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ '../views/Auth/Login'),
          meta: {
            requiresNoAuth: true,
          },
        },
        {
          path: 'signup',
          name: 'register',
          component: () => import(/* webpackChunkName: "register" */ '../views/Auth/Register'),
          meta: {
            requiresNoAuth: true,
          },
        },
      ],
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
          component: () => import(/* webpackChunkName: "profile-index" */ '../views/Profile/Index'),
        },
        {
          path: 'edit',
          name: 'profile-edit',
          component: () => import(/* webpackChunkName: "profile-edit" */ '../views/Profile/Edit'),
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
