<template>
  <ActionButton
    :disabled="!sourceText"
    :icon="svgPath"
    :loading="loading"
    tooltip="Translate"
    @click="onTranslate"
  />
</template>

<script>
import { mdiSend } from '@mdi/js';
import ActionButton from '@/components/Shared/ActionButton.vue';

export default {
  name: 'TranslateButton',
  components: { ActionButton },
  data: () => ({
    svgPath: mdiSend,
  }),
  computed: {
    loading() {
      return this.$store.state.translate.isTranslating;
    },
    sourceText() {
      return this.$store.state.translate.sourceText;
    },
  },
  methods: {
    onTranslate() {
      this.$store.dispatch('translate/translate');
    },
  },
};
</script>
