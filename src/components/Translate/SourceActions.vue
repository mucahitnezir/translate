<template>
  <div class="pa-2" style="background-color: #ddd">
    <v-btn text icon>
      <v-icon>{{ svgPath }}</v-icon>
    </v-btn>
    <ListenButton :lang-code="sourceLangCode" :text="sourceText" />
  </div>
</template>

<script>
import { mdiMicrophone } from '@mdi/js';

import ListenButton from '../Shared/ListenButton.vue';

export default {
  name: 'SourceActions',
  components: {
    ListenButton,
  },
  data: () => ({
    svgPath: mdiMicrophone,
  }),
  computed: {
    sourceLangCode() {
      return this.$store.state.translate.sourceLangCode;
    },
    sourceText() {
      return this.$store.state.translate.sourceText;
    },
  },
};
</script>

<style scoped>

</style>
