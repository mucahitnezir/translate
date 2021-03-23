<template>
  <v-navigation-drawer
    app
    right
    clipped
    touchless
    hide-overlay
    disable-resize-watcher
    :permanent="$vuetify.breakpoint.mdAndUp"
    :width="panelWidth"
    :value="true"
  >
    <template v-slot:prepend>
      <v-toolbar flat color="transparent">
        <v-btn v-if="$vuetify.breakpoint.smAndDown" icon to="/">
          <v-icon>{{ icons.mdiArrowLeft }}</v-icon>
        </v-btn>
        <v-toolbar-title class="pl-0">
          {{ title }}
        </v-toolbar-title>
        <v-spacer />
        <CloseButton to="/" />
      </v-toolbar>
      <v-divider />
    </template>
    <slot />
  </v-navigation-drawer>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js';

import CloseButton from '@/components/Shared/CloseButton.vue';

export default {
  name: 'RightPanel',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  components: { CloseButton },
  data: () => ({
    icons: { mdiArrowLeft },
  }),
  computed: {
    panelWidth() {
      if (this.$vuetify.breakpoint.lgAndUp) {
        return 400;
      }
      if (this.$vuetify.breakpoint.md) {
        return 325;
      }
      return '100%';
    },
  },
};
</script>
