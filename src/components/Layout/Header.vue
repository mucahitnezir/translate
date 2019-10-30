<template>
  <v-app-bar
    app
    clipped-left
    flat
  >
    <v-app-bar-nav-icon @click.stop="changeDrawerStatus" />

    <v-toolbar-title>
      <router-link :to="{ name: 'home' }" tag="span" style="cursor: pointer;">
        Translate
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <template v-if="!isLoggedIn">
        <v-btn
          :to="{ name: 'login' }"
          color="primary"
          rounded
          text
        >
          Login
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          color="primary"
          rounded
          text
          @click="onLogOut"
        >
          Logout
        </v-btn>
      </template>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    drawerStatus() {
      return this.$store.state.drawer;
    },
    isLoggedIn() {
      return this.$store.getters['auth/isAuthenticated'];
    },
  },
  methods: {
    changeDrawerStatus() {
      this.$store.dispatch('changeDrawerStatus', !this.drawerStatus);
    },
    onLogOut() {
      this.$store.dispatch('auth/logOut')
        .then(() => {
          this.$router.push({ name: 'login' });
        })
        .catch((err) => {
          const notification = {
            type: 'error',
            message: err.message,
          };
          this.$store.dispatch('notification/add', notification);
        });
    },
  },
};
</script>

<style scoped>

</style>
