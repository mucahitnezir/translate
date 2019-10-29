<template>
  <div class="pa-2" style="background-color: #ddd">
    <Speech :lang-code="targetLangCode" :text="translatedText" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Speech from './Speech.vue';

export default {
  name: 'TargetActions',
  components: {
    Speech,
  },
  computed: {
    ...mapState('translate', ['targetLangCode', 'translatedText']),
    isButtonDisabled() {
      return !this.translatedText;
    },
  },
};
</script>

<style scoped>

</style>
