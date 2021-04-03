<template>
  <v-snackbar
    v-model="snackVisible"
    :timeout="3000"
  >
    {{ text }}
    <v-btn
      color="pink"
      text
      @click="hideSnackBar"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'TheNotificationWrapper',
  computed: {
    text() {
      return this.$store.state.notification.snack.text;
    },
    snackVisible: {
      get() {
        return this.$store.state.notification.snack.visible;
      },
      set(value) {
        this.$store.dispatch('notification/setSnackVisible', value);
      },
    },
  },
  methods: {
    hideSnackBar() {
      this.$store.dispatch('notification/setSnackVisible', false);
    },
  },
};
</script>
