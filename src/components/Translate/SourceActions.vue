<template>
  <div class="pa-2" style="background-color: #ddd">
    <v-btn text icon>
      <v-icon>mdi-microphone</v-icon>
    </v-btn>
    <SpeechButton :lang-code="sourceLangCode" :text="sourceText" />
  </div>
</template>

<script>
import SpeechButton from '../Shared/SpeechButton.vue';

export default {
  name: 'SourceActions',
  components: {
    SpeechButton,
  },
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
