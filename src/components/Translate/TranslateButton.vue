<template>
  <v-btn :disabled="isDisabled" color="primary" @click="onTranslate">Translate</v-btn>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TranslateButton',
  computed: {
    ...mapState('translate', ['sourceText']),
    isDisabled() {
      return !this.sourceText;
    },
  },
  methods: {
    onTranslate() {
      this.$store.dispatch('translate/translate');
    },
  },
};
</script>

<style scoped>

</style>
