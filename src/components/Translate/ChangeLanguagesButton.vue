<template>
  <v-btn
    :disabled="isDisabled"
    icon
    large
    text
    @click="changeLanguages"
  >
    <v-icon>{{ svgPath }}</v-icon>
  </v-btn>
</template>

<script>
import { mapState } from 'vuex';
import { mdiSwapHorizontal } from '@mdi/js';

export default {
  name: 'ChangeLanguagesButton',
  data: () => ({
    svgPath: mdiSwapHorizontal,
  }),
  computed: {
    ...mapState('translate', ['sourceLangCode']),
    isDisabled() {
      return this.sourceLangCode === 'auto';
    },
  },
  methods: {
    changeLanguages() {
      this.$store.dispatch('translate/changeLanguages');
    },
  },
};
</script>

<style scoped>

</style>
