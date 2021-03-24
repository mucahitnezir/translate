<template>
  <ActionButton
    :disabled="isDisabled"
    :icon="svgPath"
    :loading="loading"
    tooltip="Listen"
    @click="onSpeechText"
  />
</template>

<script>
import { mdiVolumeHigh } from '@mdi/js';

import { functions } from '@/firebase';
import { getVoiceIdFromLangCode } from '@/services/speech';

import ActionButton from '@/components/Shared/ActionButton.vue';

export default {
  name: 'ListenButton',
  components: { ActionButton },
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
    loading: false,
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
        this.loading = true;

        const params = { voiceId, text: this.text };
        functions.httpsCallable('speechText')(params)
          .then((response) => {
            const audio = new Audio(response.data.url);
            audio.play();
          })
          .catch((err) => {
            this.$store.dispatch('notification/setSnackText', err.message);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
