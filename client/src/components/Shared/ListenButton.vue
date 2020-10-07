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
            const audioStream = response.data.AudioStream;
            const uInt8Array = new Uint8Array(audioStream);
            const arrayBuffer = uInt8Array.buffer;
            const blob = new Blob([arrayBuffer], { type: response.data.ContentType });

            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audio.play();
          })
          .catch((err) => {
            const notification = {
              type: 'error',
              message: err.message,
            };
            this.$store.dispatch('notification/add', notification);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
