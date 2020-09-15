<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn :disabled="isButtonDisabled" text icon v-on="on" @click="copyToClipboard">
        <v-icon>{{ svgPath }}</v-icon>
      </v-btn>
    </template>
    <span>Copy</span>
  </v-tooltip>
</template>

<script>
import { mdiContentCopy } from '@mdi/js';

export default {
  name: 'CopyToClipboardButton',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    svgPath: mdiContentCopy,
  }),
  computed: {
    isButtonDisabled() {
      return !this.text;
    },
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.text)
        .then(() => {
          const message = 'Copied to clipboard';
          this.$store.dispatch('notification/setSnackText', message);
        })
        .catch((err) => {
          const { message } = err;
          this.$store.dispatch('notification/setSnackText', message);
        });
    },
  },
};
</script>
