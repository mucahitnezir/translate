<template>
  <v-autocomplete
    v-model="targetLang"
    :items="targetLanguages"
    dense
    hide-details
    solo
    :flat="!$vuetify.theme.dark"
    :class="{'border-grey': !$vuetify.theme.dark}"
  />
</template>

<script>
export default {
  name: 'TargetLanguageSelect',
  computed: {
    targetLanguages() {
      return this.$store.state.translate.targetLanguages;
    },
    targetLang: {
      get() {
        return this.$store.state.translate.targetLangCode;
      },
      set(val) {
        this.$store.dispatch('translate/changeTargetLang', val);
      },
    },
  },
};
</script>
