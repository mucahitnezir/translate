<template>
  <v-app>
    <Header />

    <Sidebar />

    <v-content>
      <v-container>
        <NotificationContainer />

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
import NotificationContainer from './components/Notification/NotificationContainer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    Footer,
    NotificationContainer,
  },
  data: () => ({}),
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
