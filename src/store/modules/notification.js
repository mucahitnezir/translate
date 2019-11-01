let nextId = 2;

export default {
  namespaced: true,
  state: {
    notifications: [],
    snack: {
      visible: false,
      text: null,
    },
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
    SET_SNACK_VISIBLE(state, visible) {
      state.snack.visible = visible;
    },
    SET_SNACK_TEXT(state, text) {
      state.snack.text = text;
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
    setSnackText({ commit }, text) {
      commit('SET_SNACK_TEXT', text);
      commit('SET_SNACK_VISIBLE', !!text);
    },
    setSnackVisible({ commit }, visible) {
      commit('SET_SNACK_VISIBLE', visible);
    },
  },
  getters: {},
};
