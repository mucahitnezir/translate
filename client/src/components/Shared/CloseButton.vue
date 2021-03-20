<template>
  <v-btn icon :to="to" large @click="$emit('click')">
    <v-icon>{{ svgPath }}</v-icon>
  </v-btn>
</template>

<script>
import { mdiClose } from '@mdi/js';

export default {
  name: 'CloseButton',
  props: {
    to: {
      type: String,
      default: undefined,
    },
  },
  data: () => ({
    svgPath: mdiClose,
  }),
};
</script>
