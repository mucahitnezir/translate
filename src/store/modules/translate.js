import { sourceLanguages, targetLanguages, translateText } from '../../services/translate';

export const namespaced = true;

export const state = {
  targetLanguages,
  sourceLanguages,
  sourceLangCode: 'auto',
  targetLangCode: 'tr',
  sourceText: null,
  translatedText: null,
};

export const mutations = {
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
};

export const actions = {
  changeSourceLang({ commit }, lang) {
    commit('SET_SOURCE_LANG_CODE', lang);
  },
  changeTargetLang({ commit }, lang) {
    commit('SET_TARGET_LANG_CODE', lang);
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
  translate({ commit, state }) {
    const params = {
      SourceLanguageCode: state.sourceLangCode,
      TargetLanguageCode: state.targetLangCode,
      Text: state.sourceText,
    };
    translateText(params)
      .then((response) => {
        commit('SET_TRANSLATED_TEXT', response.TranslatedText);
        commit('SET_SOURCE_LANG_CODE', response.SourceLanguageCode);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export const getters = {};
