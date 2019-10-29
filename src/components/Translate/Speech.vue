<template>
  <v-btn :disabled="isDisabled" text icon @click="onSpeechText">
    <v-icon>mdi-volume-high</v-icon>
  </v-btn>
</template>

<script>
import { getVoiceIdFromLangCode, speechText } from '../../services/speech';

export default {
  name: 'Speech',
  props: {
    langCode: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  computed: {
    isDisabled() {
      const voiceId = getVoiceIdFromLangCode(this.langCode);
      return !this.langCode || !this.text || !voiceId;
    },
  },
  methods: {
    onSpeechText() {
      const voiceId = getVoiceIdFromLangCode(this.langCode);
      if (voiceId) {
        const params = {
          OutputFormat: 'mp3',
          Text: this.text,
          TextType: 'text',
          VoiceId: voiceId,
        };
        speechText(params)
          .then((audio) => {
            audio.play();
          })
          .catch((err) => {
            const notification = {
              type: 'error',
              message: err.message,
            };
            this.$store.dispatch('notification/add', notification);
          });
      }
    },
  },
};
</script>

<style scoped>

</style>
