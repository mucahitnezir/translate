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
    ...mapState(['translate']),
    isDisabled() {
      return this.translate.sourceLangCode === 'auto';
    },
  },
  methods: {
    changeLanguages() {
      this.$store.dispatch('changeLanguages');
    },
  },
};
</script>

<style scoped>

</style>
