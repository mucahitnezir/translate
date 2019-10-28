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
    ...mapState(['sourceLanguages']),
    sourceLang: {
      get() {
        return this.$store.state.translate.sourceLangCode;
      },
      set(val) {
        this.$store.dispatch('changeSourceLang', val);
      },
    },
  },
};
</script>

<style scoped>

</style>
