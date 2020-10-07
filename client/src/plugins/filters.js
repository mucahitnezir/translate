import Vue from 'vue';

import format from 'date-fns/format';

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
