<template>
  <v-row>
    <v-col cols="12" md="3">
      <v-list color="purple" dark :tile="false">
        <v-list-item :to="{ name: 'profile' }" :exact="true">
          <v-list-item-title>Profile Detail</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{ name: 'profile-edit' }">
          <v-list-item-title>Edit Profile</v-list-item-title>
        </v-list-item>
        <v-list-item @click="onLogOut">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col cols="12" md="9">
      <router-view />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters('auth', ['authUser']),
  },
  methods: {
    onLogOut() {
      this.$store.dispatch('auth/logOut')
        .then(() => {
          this.$router.push({ name: 'login' });
        });
    },
  },
};
</script>
