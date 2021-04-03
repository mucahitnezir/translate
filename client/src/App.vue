<template>
  <v-app>
    <TheHeader />

    <TheSidebar />

    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>

    <router-view name="right" />

    <TheNotificationWrapper />
  </v-app>
</template>

<script>
import { load } from 'webfontloader';

import { auth } from './firebase';

import TheHeader from './components/Layout/TheHeader.vue';
import TheSidebar from './components/Layout/TheSidebar.vue';
import TheNotificationWrapper from './components/Layout/TheNotificationWrapper.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheSidebar,
    TheNotificationWrapper,
  },
  metaInfo: {
    title: 'Translate',
    titleTemplate: '%s · Translate',
  },
  watch: {
    '$vuetify.theme.dark': (isDark) => {
      localStorage.setItem('vuetifyDarkTheme', isDark);
    },
  },
  created() {
    load({
      google: {
        families: ['Roboto:100,300,400,500,700,900&display=swap'],
      },
    });
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.$store.dispatch('auth/setCurrentUser', user);
    });
  },
};
</script>

<style>
  .flex-1 {
    flex: 1;
  }
  .hp-100 {
    height: 100%;
  }
  .border-grey {
    border: 1px solid #ddd!important;
  }
</style>
