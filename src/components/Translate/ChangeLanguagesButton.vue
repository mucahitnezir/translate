<template>
  <v-btn
    :disabled="isDisabled"
    icon
    large
    text
    @click="changeLanguages"
  >
    <v-icon>mdi-swap-horizontal</v-icon>
  </v-btn>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ChangeLanguagesButton',
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
