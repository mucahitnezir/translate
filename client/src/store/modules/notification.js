export default {
  namespaced: true,
  state: {
    snack: {
      visible: false,
      text: null,
    },
  },
  mutations: {
    SET_SNACK_VISIBLE(state, visible) {
      state.snack.visible = visible;
    },
    SET_SNACK_TEXT(state, text) {
      state.snack.text = text;
    },
  },
  actions: {
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
