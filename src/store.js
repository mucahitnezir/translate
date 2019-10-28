import Vue from 'vue';
import Vuex from 'vuex';

import * as AWS from 'aws-sdk';

import { sourceLanguages, targetLanguages } from './services/language';

AWS.config.update({
  accessKeyId: 'AKIAVE7SOPOQPIACGBGC',
  secretAccessKey: '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',
  region: 'eu-central-1',
});

const translate = new AWS.Translate({ apiVersion: '2017-07-01' });

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    isLoggedIn: false,
    translate: {
      sourceLangCode: 'auto',
      targetLangCode: 'tr',
      sourceText: null,
      translatedText: null,
    },
    targetLanguages,
    sourceLanguages,
  },
  mutations: {
    SET_DRAWER_STATUS(state, status) {
      state.drawer = status;
    },
    SET_SOURCE_LANG_CODE(state, langCode) {
      state.translate.sourceLangCode = langCode;
    },
    SET_TARGET_LANG_CODE(state, langCode) {
      state.translate.targetLangCode = langCode;
    },
    SET_TRANSLATED_TEXT(state, text) {
      state.translate.translatedText = text;
    },
    SET_SOURCE_TEXT(state, text) {
      state.translate.sourceText = text;
    },
  },
  actions: {
    changeDrawerStatus({ commit }, status) {
      commit('SET_DRAWER_STATUS', status);
    },
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
      const { sourceLangCode, targetLangCode, translatedText } = state.translate;
      commit('SET_SOURCE_LANG_CODE', targetLangCode);
      commit('SET_TARGET_LANG_CODE', sourceLangCode);
      commit('SET_SOURCE_TEXT', translatedText);
      commit('SET_TRANSLATED_TEXT', null);
      if (state.translate.sourceText) {
        dispatch('translate');
      }
    },
    clearTargetText({ commit }) {
      commit('SET_TRANSLATED_TEXT', null);
    },
    translate({ commit, state }) {
      const params = {
        SourceLanguageCode: state.translate.sourceLangCode,
        TargetLanguageCode: state.translate.targetLangCode,
        Text: state.translate.sourceText,
      };
      translate.translateText(params, (err, response) => {
        if (err) {
          // alert(err.message);
          return;
        }
        const translatedText = response.TranslatedText;
        commit('SET_TRANSLATED_TEXT', translatedText);
      });
    },
  },
});
