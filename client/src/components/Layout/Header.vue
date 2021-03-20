<template>
  <v-app-bar app clipped-left clipped-right elevation="1" tile>
    <v-app-bar-nav-icon @click.stop="changeDrawerStatus" />

    <v-toolbar-title class="pl-0">
      <router-link :to="{ name: 'home' }" tag="span" style="cursor: pointer;">
        Translate
      </router-link>
    </v-toolbar-title>

    <v-spacer />

    <v-btn v-if="!isAuthenticated" :to="{ name: 'login' }" text icon>
      <v-icon>{{ icons.mdiLoginVariant }}</v-icon>
    </v-btn>
    <HeaderUserCard v-else />
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import { mdiAccount, mdiLoginVariant, mdiLogoutVariant } from '@mdi/js';

import HeaderUserCard from '@/components/Layout/HeaderUserCard.vue';

export default {
  name: 'Header',
  components: { HeaderUserCard },
  data: () => ({
    icons: {
      mdiAccount,
      mdiLoginVariant,
      mdiLogoutVariant,
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
