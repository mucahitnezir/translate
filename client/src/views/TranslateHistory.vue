<template>
  <v-navigation-drawer app clipped right>
    <div class="d-flex align-center pa-4">
      <h3>History</h3>
      <v-spacer />
      <CloseButton to="/" />
    </div>
  </v-navigation-drawer>
</template>

<script>
import CloseButton from '@/components/Shared/CloseButton.vue';

export default {
  name: 'TranslateHistory',
  components: { CloseButton },
};
</script>
