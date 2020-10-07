<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn :disabled="!sourceText" icon :loading="loading" text v-on="on" @click="onTranslate">
        <v-icon>{{ svgPath }}</v-icon>
      </v-btn>
    </template>
    <span>Translate</span>
  </v-tooltip>
</template>

<script>
import { mdiSend } from '@mdi/js';

export default {
  name: 'TranslateButton',
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
