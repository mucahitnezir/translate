import Vue from 'vue';

import { auth } from './firebase';

import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged(async (user) => {
  if (!app) {
    // Set auth user
    await store.dispatch('auth/autoLogin', user);

    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount('#app');
  }
});
