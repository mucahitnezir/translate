<template>
  <v-app>
    <Header />

    <Sidebar />

    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>

    <router-view name="right" />

    <SnackBar />
  </v-app>
</template>

<script>
import { load } from 'webfontloader';

import { auth } from './firebase';

import Header from './components/Layout/Header.vue';
import Sidebar from './components/Layout/Sidebar.vue';

import SnackBar from './components/Notification/SnackBar.vue';

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    SnackBar,
  },
  data: () => ({}),
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
