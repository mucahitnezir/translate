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
    setCurrentUser({ commit }, user) {
      commit('setUser', user);
    },
    logOut({ commit }) {
      return auth.signOut()
        .then(() => commit('setUser', null));
    },
    updateProfile({ state, dispatch, commit }, payload) {
      return state.user.updateProfile(payload)
        .then(() => {
          commit('setUser', auth.currentUser);
          const message = 'Your profile updated successfully!';
          dispatch('notification/setSnackText', message, { root: true });
        })
        .catch((err) => {
          const notification = {
            type: 'error',
            message: err.message,
          };
          dispatch('notification/add', notification, { root: true });
        });
    },
    updateEmail({ state, dispatch }, email) {
      return state.user.updateEmail(email)
        .then(() => {
          const message = 'Your email address updated successfully!';
          dispatch('notification/setSnackText', message, { root: true });
        })
        .catch((err) => {
          const notification = {
            type: 'error',
            message: err.message,
          };
          dispatch('notification/add', notification, { root: true });
        });
    },
    updatePassword({ state, dispatch }, password) {
      return state.user.updatePassword(password)
        .then(() => {
          const message = 'Your password updated successfully!';
          dispatch('notification/setSnackText', message, { root: true });
        })
        .catch((err) => {
          const notification = {
            type: 'error',
            message: err.message,
          };
          dispatch('notification/add', notification, { root: true });
        });
    },
  },
  getters: {
    isAuthenticated: state => !!state.user,
    authUser: state => state.user,
  },
};
