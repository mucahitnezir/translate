<template>
  <v-navigation-drawer
    app
    right
    clipped
    hide-overlay
    disable-resize-watcher
    :permanent="$vuetify.breakpoint.mdAndUp"
    :width="$vuetify.breakpoint.smAndDown ? '100%' : 400"
    :value="true"
  >
    <template v-slot:prepend>
      <v-toolbar flat color="transparent">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer />
        <CloseButton to="/" />
      </v-toolbar>
      <v-divider />
    </template>
    <slot />
  </v-navigation-drawer>
</template>

<script>
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
};
</script>
