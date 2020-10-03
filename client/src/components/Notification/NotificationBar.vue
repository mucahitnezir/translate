<template>
  <v-alert
    v-model="alert"
    text
    border="left"
    :colored-border="true"
    :dismissible="true"
    :type="notification.type"
  >
    {{ notification.message }}
  </v-alert>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'NotificationBar',
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    timeout: null,
    alert: true,
  }),
  watch: {
    alert(value) {
      if (value === false) {
        this.remove(this.notification);
      }
    },
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 3000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  methods: mapActions('notification', ['remove']),
};
</script>
