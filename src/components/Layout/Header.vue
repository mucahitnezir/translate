<template>
  <v-app-bar
    app
    clipped-left
    flat
  >
    <v-app-bar-nav-icon @click.stop="changeDrawerStatus" />

    <v-toolbar-title class="headline">
      <router-link :to="{ name: 'home' }" tag="span" style="cursor: pointer;">
        Translate
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <template v-if="!isLoggedIn">
        <v-btn
          color="primary"
          rounded
          text
        >
          Login
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
      return this.$store.state.isLoggedIn;
    },
  },
  methods: {
    changeDrawerStatus() {
      this.$store.dispatch('changeDrawerStatus', !this.drawerStatus);
    },
  },
};
</script>

<style scoped>

</style>
