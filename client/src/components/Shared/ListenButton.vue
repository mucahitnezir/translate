<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn :disabled="isDisabled" text icon v-on="on" @click="onSpeechText">
        <v-icon>{{ svgPath }}</v-icon>
      </v-btn>
    </template>
    <span>Listen</span>
  </v-tooltip>
</template>

<script>
import { mdiVolumeHigh } from '@mdi/js';

import { getVoiceIdFromLangCode, speechText } from '../../services/speech';

export default {
  name: 'Listen',
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
  data: () => ({
    svgPath: mdiVolumeHigh,
  }),
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
