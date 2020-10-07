<template>
  <ActionButton
    :disabled="isButtonDisabled"
    :icon="svgPath"
    tooltip="Copy"
    @click="copyToClipboard"
  />
</template>

<script>
import { mdiContentCopy } from '@mdi/js';
import ActionButton from '@/components/Shared/ActionButton.vue';

export default {
  name: 'CopyToClipboardButton',
  components: { ActionButton },
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
