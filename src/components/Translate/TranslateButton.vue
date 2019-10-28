<template>
  <v-btn :disabled="isDisabled" color="primary" @click="onTranslate">Translate</v-btn>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TranslateButton',
  computed: {
    ...mapState(['translate']),
    isDisabled() {
      return !this.translate.sourceText;
    },
  },
  methods: {
    onTranslate() {
      this.$store.dispatch('translate');
    },
  },
};
</script>

<style scoped>

</style>
