import Vue from 'vue';
import Router from 'vue-router';

import AuthGuard from './authGuard';

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import About from '../views/About.vue';
import NotFound from '../views/NotFound.vue';

import Profile from '../views/Profile.vue';
import ProfileIndex from '../views/Profile/ProfileIndex.vue';
import ProfileEdit from '../views/Profile/ProfileEdit.vue';

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
      path: '/profile',
      component: Profile,
      children: [
        {
          path: '',
          name: 'profile',
          component: ProfileIndex,
        },
        {
          path: 'edit',
          name: 'profile-edit',
          component: ProfileEdit,
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
