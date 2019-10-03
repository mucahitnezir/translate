<template>
  <v-textarea
    :background-color="bgColor"
    color="white"
    solo
    flat
    hide-details
    label="Target Text"
    value="Merhaba"
    readonly
    auto-grow
  />
</template>

<script>
export default {
  name: 'TargetInput',
  computed: {
    bgColor() {
      return this.$vuetify.breakpoint.mdAndDown ? 'primary' : 'gray';
    },
  },
};
</script>

<style scoped>

</style>
