<template>
  <v-textarea
    :value="translatedText"
    auto-grow
    background-color="transparent"
    flat
    hide-details
    label="Target Text"
    readonly
    solo
  />
</template>

<script>
export default {
  name: 'TargetInput',
  computed: {
    translatedText() {
      return this.$store.state.translate.translatedText;
    },
  },
};
</script>
