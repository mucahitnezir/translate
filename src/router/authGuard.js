import store from '../store';

export default (to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  // Guard no auth required pages
  if (to.matched.some(record => record.meta.requiresNoAuth)) {
    if (isAuthenticated) {
      return next({ name: 'home' });
    }
    return next();
  }
  // Guard auth required pages
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next({
        name: 'login',
        query: { redirect: to.fullPath },
      });
    }
    return next();
  }
  return next();
};
