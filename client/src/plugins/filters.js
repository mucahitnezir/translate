import Vue from 'vue';

import format from 'date-fns/format';
import { sourceLanguages } from '@/services/translate';

Vue.filter('date', (val, emptyText = '') => {
  if (!val) {
    return emptyText;
  }
  const date = new Date(val);
  return format(date, 'dd LLLL u');
});

Vue.filter('datetime', (val) => {
  if (!val) {
    return '';
  }
  const date = new Date(val);
  return format(date, 'dd LLLL u HH:mm');
});

Vue.filter('lang', (val) => {
  const language = sourceLanguages.find(lang => lang.value === val);
  return language ? language.text : val;
});
