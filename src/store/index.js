import Vue from 'vue';
import Vuex from 'vuex';

import authModule from './modules/auth';
import translateModule from './modules/translate';
import notificationModule from './modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
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
    auth: authModule,
    translate: translateModule,
    notification: notificationModule,
  },
});
