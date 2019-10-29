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
import { mapState } from 'vuex';

export default {
  name: 'SourceLanguageSelect',
  computed: {
    ...mapState('translate', ['sourceLanguages', 'sourceLangCode']),
    sourceLang: {
      get() {
        return this.sourceLangCode;
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
