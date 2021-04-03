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
      <!--Theme Selection-->
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>
          {{ $vuetify.theme.dark ? icons.mdiWeatherNight : icons.mdiWhiteBalanceSunny }}
        </v-icon>
      </v-btn>
      <!--// Theme Selection-->

      <!--Login Button-->
      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-divider class="mx-2 my-auto" vertical inset style="height: 20px" />

        <v-btn class="text-none" text :to="{ name: 'login' }">
          Sign in
        </v-btn>
      </template>
      <!--// Login Button-->

      <!--Sign Up Button-->
      <v-btn color="primary" class="text-none ml-1" depressed :to="{ name: 'register' }">
        Sign up
      </v-btn>
      <!--// Sign Up Button-->
    </template>
    <TheHeaderUserCard v-else />
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';

import TheHeaderUserCard from '@/components/Layout/TheHeaderUserCard.vue';

export default {
  name: 'TheHeader',
  components: { TheHeaderUserCard },
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
  },
};
</script>
