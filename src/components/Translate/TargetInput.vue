<template>
  <v-textarea
    :value="translatedText"
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
export default {
  name: 'TargetInput',
  computed: {
    translatedText() {
      return this.$store.state.translate.translatedText;
    },
  },
};
</script>
