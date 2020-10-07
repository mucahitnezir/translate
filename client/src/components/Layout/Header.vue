<template>
  <v-app-bar
    app
    clipped-left
    flat
  >
    <v-app-bar-nav-icon @click.stop="changeDrawerStatus" />

    <v-toolbar-title class="pl-0">
      <router-link :to="{ name: 'home' }" tag="span" style="cursor: pointer;">
        Translate
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <template v-if="!isAuthenticated">
        <v-btn
          :to="{ name: 'login' }"
          text
          icon
        >
          <v-icon>{{ icons.mdiLoginVariant }}</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          :to="{ name: 'profile' }"
          text
          icon
        >
          <v-icon>{{ icons.mdiAccount }}</v-icon>
        </v-btn>
        <v-btn
          text
          icon
          @click="onLogOut"
        >
          <v-icon>{{ icons.mdiLogoutVariant }}</v-icon>
        </v-btn>
      </template>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import { mdiLoginVariant, mdiLogoutVariant, mdiAccount } from '@mdi/js';

export default {
  name: 'Header',
  data: () => ({
    icons: {
      mdiLoginVariant,
      mdiLogoutVariant,
      mdiAccount,
    },
  }),
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    drawerStatus() {
      return this.$store.state.drawer;
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
          this.$store.dispatch('notification/setSnackText', err.message);
        });
    },
  },
};
</script>
