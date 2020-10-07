<template>
  <v-card :elevation="2">
    <v-card-text>
      <h5>Display Name</h5>
      <p>{{ authUser.displayName }}</p>

      <h5>Email</h5>
      <p class="d-flex align-center">
        <span class="d-inline-block mr-2">
          {{ authUser.email }}
        </span>
        <v-btn v-if="!authUser.emailVerified" x-small color="primary" @click="onConfirm">
          Confirm it
        </v-btn>
      </p>

      <h5>Created At</h5>
      <p>{{ authUser.metadata.creationTime | datetime }}</p>

      <h5>Last Login</h5>
      <p class="mb-0">{{ authUser.metadata.lastSignInTime | datetime }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Index',
  computed: {
    ...mapGetters('auth', ['authUser']),
  },
  methods: {
    onConfirm() {
      if (!this.authUser.emailVerified) {
        this.$store.dispatch('auth/sendEmailVerification');
      }
    },
  },
};
</script>
