<template>
  <v-app-bar app clipped-left clipped-right elevation="1" tile>
    <v-app-bar-nav-icon @click.stop="changeDrawerStatus" />

    <v-toolbar-title class="pl-0">
      <router-link :to="{ name: 'home' }" tag="span" style="cursor: pointer;">
        Translate
      </router-link>
    </v-toolbar-title>

    <v-spacer />

    <template v-if="!isAuthenticated">
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>
          {{ $vuetify.theme.dark ? icons.mdiWeatherNight : icons.mdiWhiteBalanceSunny }}
        </v-icon>
      </v-btn>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-divider class="mx-2 my-auto" vertical inset style="height: 20px" />

        <v-btn class="text-none" text :to="{ name: 'login' }">
          Sign in
        </v-btn>
      </template>
      <v-btn color="primary" class="text-none ml-1" depressed :to="{ name: 'register' }">
        Sign up
      </v-btn>
    </template>
    <HeaderUserCard v-else />
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';

import HeaderUserCard from '@/components/Layout/HeaderUserCard.vue';

export default {
  name: 'Header',
  components: { HeaderUserCard },
  data() {
    return {
      icons: { mdiWeatherNight, mdiWhiteBalanceSunny },
    };
  },
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
