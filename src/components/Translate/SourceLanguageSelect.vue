<template>
  <div>
    <v-select
      v-model="sourceLang"
      :items="sourceLanguages"
      dense
      hide-details
      solo
    />
  </div>
</template>

<script>
export default {
  name: 'SourceLanguageSelect',
  computed: {
    sourceLanguages() {
      return this.$store.state.translate.sourceLanguages;
    },
    sourceLang: {
      get() {
        return this.$store.state.translate.sourceLangCode;
      },
      set(val) {
        this.$store.dispatch('translate/changeSourceLang', val);
      },
    },
  },
};
</script>

<style scoped>

</style>
