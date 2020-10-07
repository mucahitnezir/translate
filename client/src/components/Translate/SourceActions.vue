<template>
  <div class="d-inline-flex pa-2" style="background-color: #ddd">
    <v-btn text icon>
      <v-icon>{{ svgPath }}</v-icon>
    </v-btn>
    <ListenButton :lang-code="sourceLangCode" :text="sourceText" />
    <v-spacer />
    <TranslateButton />
  </div>
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
