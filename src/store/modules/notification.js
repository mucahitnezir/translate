let nextId = 2;

export default {
  namespaced: true,
  state: {
    notifications: [],
  },
  mutations: {
    PUSH(state, notification) {
      nextId += 1;
      state.notifications.push({
        id: nextId,
        ...notification,
      });
    },
    DELETE(state, deleted) {
      const filter = state.notifications.filter(notification => notification.id !== deleted.id);
      state.notifications = filter;
    },
    CLEAR(state) {
      state.notifications = [];
    },
  },
  actions: {
    add({ commit }, notification) {
      commit('PUSH', notification);
    },
    remove({ commit }, notification) {
      commit('DELETE', notification);
    },
    clear({ commit }) {
      commit('CLEAR');
    },
  },
  getters: {},
};
