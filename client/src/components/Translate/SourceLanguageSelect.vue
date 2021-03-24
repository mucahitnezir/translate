<template>
  <v-autocomplete
    v-model="sourceLang"
    :items="sourceLanguages"
    dense
    hide-details
    solo
    :flat="!$vuetify.theme.dark"
    :class="{'border-grey': !$vuetify.theme.dark}"
  />
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
