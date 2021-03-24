<template>
  <v-menu
    v-model="menu"
    :max-width="280"
    :nudge-top="-10"
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mr-0" icon v-bind="attrs" v-on="on">
        <v-avatar>
          <img :src="authUser.photoURL" :alt="authUser.displayName">
        </v-avatar>
      </v-btn>
    </template>

    <v-card>
      <v-list class="py-0">
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="authUser.photoURL" :alt="authUser.displayName" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ authUser.displayName }}</v-list-item-title>
            <v-list-item-subtitle>{{ authUser.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-icon class="mr-3">
            <v-icon>
              {{ $vuetify.theme.dark ? icons.mdiWeatherNight : icons.mdiWhiteBalanceSunny }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dark Theme</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch v-model="$vuetify.theme.dark" />
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-list-item @click="navigateToProfile">
          <v-list-item-title>Update Your Profile</v-list-item-title>
        </v-list-item>
        <v-divider />
      </v-list>
      <v-card-text>
        <v-btn
          block
          depressed
          :loading="loading"
          outlined
          rounded
          @click="onLogout"
        >
          Sign out
        </v-btn>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';

export default {
  name: 'HeaderUserCard',
  data() {
    return {
      menu: false,
      loading: false,
      icons: { mdiWeatherNight, mdiWhiteBalanceSunny },
    };
  },
  computed: {
    ...mapGetters('auth', ['authUser']),
  },
  methods: {
    navigateToProfile() {
      this.menu = false;
      // Route to page
      const { name: routeName } = this.$route;
      if (routeName !== 'profile-edit') {
        this.$router.push({ name: 'profile-edit' });
      }
    },
    onLogout() {
      this.loading = true;
      this.$store.dispatch('auth/logOut')
        .then(() => {
          this.menu = false;
          this.$router.push({ name: 'login' });
        })
        .catch((err) => {
          this.$store.dispatch('notification/setSnackText', err.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
