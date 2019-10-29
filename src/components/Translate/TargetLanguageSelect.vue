<template>
  <div>
    <v-select
      v-model="targetLang"
      :items="targetLanguages"
      dense
      solo
      hide-details
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TargetLanguageSelect',
  computed: {
    ...mapState('translate', ['targetLanguages', 'targetLangCode']),
    targetLang: {
      get() {
        return this.targetLangCode;
      },
      set(val) {
        this.$store.dispatch('translate/changeTargetLang', val);
      },
    },
  },
};
</script>

<style scoped>

</style>
