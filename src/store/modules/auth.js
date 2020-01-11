import { auth } from '../../firebase';

export default {
  namespaced: true,
  state: {
    user: undefined,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, data) {
      return auth.signInWithEmailAndPassword(data.email, data.password)
        .then((credential) => {
          commit('setUser', credential.user);
          return credential.user;
        });
    },
    autoLogin({ commit }, user) {
      commit('setUser', user);
    },
    logOut({ commit }) {
      return auth.signOut()
        .then(() => commit('setUser', null));
    },
  },
  getters: {
    isAuthenticated: state => !!state.user,
    authUser: state => state.user,
  },
};
