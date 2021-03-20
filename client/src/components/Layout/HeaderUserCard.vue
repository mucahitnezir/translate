<template>
  <v-menu
    v-model="menu"
    :max-width="280"
    :nudge-top="-10"
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
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
        <v-list-item :to="{ name: 'profile-edit' }">
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

export default {
  name: 'HeaderUserCard',
  data() {
    return {
      menu: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['authUser']),
  },
  methods: {
    onLogout() {
      this.loading = true;
      this.$store.dispatch('auth/logOut')
        .then(() => {
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
