<template>
  <v-app>
    <Header />

    <Sidebar />

    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Header from './components/Layout/Header.vue';
import Sidebar from './components/Layout/Sidebar.vue';
import Footer from './components/Layout/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    Footer,
  },
  data: () => ({}),
};
</script>
