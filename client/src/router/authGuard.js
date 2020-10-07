import store from '@/store';
import { auth } from '@/firebase';

export default async (to, from, next) => {
  // Find that user is authenticated
  const { user } = store.state.auth;
  if (user === undefined) {
    const currentUser = await auth.getCurrentUser();
    await store.dispatch('auth/setCurrentUser', currentUser);
  }
  const isAuthenticated = store.getters['auth/isAuthenticated'];

  // Guard no auth required pages
  const requiresNoAuth = to.matched.some(record => record.meta.requiresNoAuth);
  if (requiresNoAuth && isAuthenticated) {
    return next({ name: 'home' });
  }

  // Guard auth required pages
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !isAuthenticated) {
    return next({
      name: 'login',
      query: { redirect: to.fullPath },
    });
  }

  return next();
};
