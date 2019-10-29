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
    @click:clear="onClear"
  />
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SourceInput',
  computed: {
    ...mapState('translate', ['sourceText']),
    inputValue: {
      get() {
        return this.sourceText;
      },
      set(val) {
        this.$store.dispatch('translate/changeSourceText', val);
      },
    },
  },
  methods: {
    onClear() {
      this.$store.dispatch('translate/clearTargetText');
    },
  },
};
</script>

<style scoped>

</style>
