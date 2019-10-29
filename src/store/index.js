import Vue from 'vue';
import Vuex from 'vuex';

import translateModule from './modules/translate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    isLoggedIn: false,
  },
  mutations: {
    SET_DRAWER_STATUS(state, status) {
      state.drawer = status;
    },
  },
  actions: {
    changeDrawerStatus({ commit }, status) {
      commit('SET_DRAWER_STATUS', status);
    },
  },
  modules: {
    translate: translateModule,
  },
});
