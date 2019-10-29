<template>
  <div class="pa-2" style="background-color: #ddd">
    <v-btn text icon>
      <v-icon>mdi-microphone</v-icon>
    </v-btn>
    <Speech :lang-code="sourceLangCode" :text="sourceText" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Speech from './Speech.vue';

export default {
  name: 'SourceActions',
  components: {
    Speech,
  },
  computed: {
    ...mapState('translate', ['sourceLangCode', 'sourceText']),
  },
};
</script>

<style scoped>

</style>
