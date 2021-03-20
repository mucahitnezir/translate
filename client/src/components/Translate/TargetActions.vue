<template>
  <v-card class="d-flex pa-2" style="background-color: #ddd" flat tile light>
    <ListenButton :lang-code="targetLangCode" :text="translatedText" />
    <v-spacer />
    <CopyToClipboardButton :text="translatedText" />
  </v-card>
</template>

<script>
import ListenButton from '../Shared/ListenButton.vue';
import CopyToClipboardButton from '../Shared/CopyToClipboardButton.vue';

export default {
  name: 'TargetActions',
  components: {
    ListenButton,
    CopyToClipboardButton,
  },
  computed: {
    targetLangCode() {
      return this.$store.state.translate.targetLangCode;
    },
    translatedText() {
      return this.$store.state.translate.translatedText;
    },
  },
};
</script>
