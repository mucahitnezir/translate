import { sourceLanguages, targetLanguages } from '@/services/translate';
import { functions } from '@/firebase';

export default {
  namespaced: true,
  state: {
    targetLanguages,
    sourceLanguages,
    isTranslating: false,
    sourceLangCode: 'auto',
    targetLangCode: 'tr',
    sourceText: null,
    translatedText: null,
  },
  mutations: {
    SET_TRANSLATING(state, isTranslating) {
      state.isTranslating = isTranslating;
    },
    SET_SOURCE_LANG_CODE(state, langCode) {
      state.sourceLangCode = langCode;
    },
    SET_TARGET_LANG_CODE(state, langCode) {
      state.targetLangCode = langCode;
    },
    SET_TRANSLATED_TEXT(state, text) {
      state.translatedText = text;
    },
    SET_SOURCE_TEXT(state, text) {
      state.sourceText = text;
    },
  },
  actions: {
    changeSourceLang({ commit }, lang) {
      commit('SET_SOURCE_LANG_CODE', lang);
    },
    changeTargetLang({ commit, state, dispatch }, lang) {
      const { sourceText } = state;
      commit('SET_TARGET_LANG_CODE', lang);
      if (sourceText) {
        dispatch('translate');
      }
    },
    changeSourceText({ commit }, text) {
      commit('SET_SOURCE_TEXT', text);
    },
    changeLanguages({ commit, state, dispatch }) {
      const { sourceLangCode, targetLangCode, translatedText } = state;
      commit('SET_SOURCE_LANG_CODE', targetLangCode);
      commit('SET_TARGET_LANG_CODE', sourceLangCode);
      commit('SET_SOURCE_TEXT', translatedText);
      commit('SET_TRANSLATED_TEXT', null);
      if (state.sourceText) {
        dispatch('translate');
      }
    },
    clearTargetText({ commit }) {
      commit('SET_TRANSLATED_TEXT', null);
    },
    translate({ commit, state, dispatch }) {
      const sourceText = state.sourceText.trim();
      if (sourceText.length > 100) {
        const notification = {
          type: 'error',
          message: 'Maximum allowed character is 100.',
        };
        dispatch('notification/add', notification, { root: true });
        return;
      }
      if (sourceText) {
        const params = {
          sourceLangCode: state.sourceLangCode,
          targetLangCode: state.targetLangCode,
          text: sourceText,
        };
        commit('SET_TRANSLATING', true);
        return functions.httpsCallable('translate')(params)
          .then((response) => {
            commit('SET_TRANSLATED_TEXT', response.data.translatedText);
            commit('SET_SOURCE_LANG_CODE', response.data.sourceLangCode);
            return response;
          })
          .catch((err) => {
            const notification = {
              type: 'error',
              message: err.message,
            };
            dispatch('notification/add', notification, { root: true });
          })
          .finally(() => {
            commit('SET_TRANSLATING', false);
          });
      } else {
        console.log('yok');
      }
    },
  },
  getters: {},
};
