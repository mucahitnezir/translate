<template>
  <v-textarea
    v-model="inputValue"
    auto-grow
    background-color="white"
    clearable
    flat
    hide-details
    label="Source Text"
    solo
  />
</template>

<script>
export default {
  name: 'SourceInput',
  data: () => ({
    inputValue: 'Hello',
  }),
};
</script>

<style scoped>

</style>
