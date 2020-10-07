<template>
  <v-app>
    <Header />

    <Sidebar />

    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>

    <SnackBar />

    <Footer />
  </v-app>
</template>

<script>
import { load } from 'webfontloader';

import { auth } from './firebase';

import Header from './components/Layout/Header.vue';
import Sidebar from './components/Layout/Sidebar.vue';
import Footer from './components/Layout/Footer.vue';

import SnackBar from './components/Notification/SnackBar.vue';

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    Footer,
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
  .bg-target-gray {
    background-color: #F5F5F5;
  }
</style>
