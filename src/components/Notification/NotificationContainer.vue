<template>
  <div class="notification-container" :class="{'mb-4': notifications.length > 0}">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from './NotificationBar.vue';

export default {
  name: 'NotificationContainer',
  components: {
    NotificationBar,
  },
  computed: {
    notifications() {
      return this.$store.state.notification.notifications;
    },
  },
};
</script>

<style scoped>

</style>
