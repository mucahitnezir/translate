import { auth } from '@/firebase';

export default {
  namespaced: true,
  state: {
    user: undefined,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, data) {
      return auth.signInWithEmailAndPassword(data.email, data.password)
        .then((credential) => {
          commit('SET_USER', credential.user);
          return credential.user;
        });
    },
    setCurrentUser({ commit }, user) {
      commit('SET_USER', user);
    },
    logOut({ commit }) {
      return auth.signOut()
        .then(() => commit('SET_USER', null));
    },
    updateProfile({ state, dispatch, commit }, payload) {
      return state.user.updateProfile(payload)
        .then(() => {
          commit('SET_USER', auth.currentUser);
          const message = 'Your profile updated successfully!';
          dispatch('notification/setSnackText', message, { root: true });
        })
        .catch((err) => {
          dispatch('notification/setSnackText', err.message, { root: true });
        });
    },
    updateEmail({ state, dispatch }, email) {
      return state.user.updateEmail(email)
        .then(() => {
          const message = 'Your email address updated successfully!';
          dispatch('notification/setSnackText', message, { root: true });
        })
        .catch((err) => {
          dispatch('notification/setSnackText', err.message, { root: true });
        });
    },
    updatePassword({ state, dispatch }, password) {
      return state.user.updatePassword(password)
        .then(() => {
          const message = 'Your password updated successfully!';
          dispatch('notification/setSnackText', message, { root: true });
        })
        .catch((err) => {
          dispatch('notification/setSnackText', err.message, { root: true });
        });
    },
    sendEmailVerification({ state, dispatch }) {
      return state.user.sendEmailVerification()
        .then(() => {
          const message = 'Email sent!';
          dispatch('notification/setSnackText', message, { root: true });
        })
        .catch((err) => {
          dispatch('notification/setSnackText', err.message, { root: true });
        });
    },
  },
  getters: {
    isAuthenticated: state => !!state.user,
    authUser: state => state.user,
  },
};
