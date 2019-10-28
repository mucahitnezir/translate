<template>
  <v-textarea
    :value="translate.translatedText"
    auto-grow
    background-color="#F5F5F5"
    flat
    hide-details
    label="Target Text"
    readonly
    solo
  />
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TargetInput',
  computed: {
    ...mapState(['translate']),
  },
};
</script>

<style scoped>

</style>
