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
    ...mapState(['targetLanguages']),
    targetLang: {
      get() {
        return this.$store.state.translate.targetLangCode;
      },
      set(val) {
        this.$store.dispatch('changeTargetLang', val);
      },
    },
  },
};
</script>

<style scoped>

</style>
