<template>
  <v-card class="d-flex pa-2" style="background-color: #ddd" flat tile light>
    <ActionButton :icon="svgPath" tooltip="Speech to Text" disabled />
    <ListenButton :lang-code="sourceLangCode" :text="sourceText" />
    <v-spacer />
    <TranslateButton />
  </v-card>
</template>

<script>
import { mdiMicrophone } from '@mdi/js';

import ActionButton from '@/components/Shared/ActionButton.vue';
import ListenButton from '@/components/Shared/ListenButton.vue';
import TranslateButton from '@/components/Translate/TranslateButton.vue';

export default {
  name: 'SourceActions',
  components: {
    ActionButton,
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
