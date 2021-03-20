<template>
  <v-card class="d-flex pa-2" style="background-color: #ddd" flat tile light>
    <v-btn text icon>
      <v-icon>{{ svgPath }}</v-icon>
    </v-btn>
    <ListenButton :lang-code="sourceLangCode" :text="sourceText" />
    <v-spacer />
    <TranslateButton />
  </v-card>
</template>

<script>
import { mdiMicrophone } from '@mdi/js';

import ListenButton from '@/components/Shared/ListenButton.vue';
import TranslateButton from '@/components/Translate/TranslateButton.vue';

export default {
  name: 'SourceActions',
  components: {
    ListenButton,
    TranslateButton,
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
