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
    ...mapState(['translate']),
    inputValue: {
      get() {
        return this.translate.sourceText;
      },
      set(val) {
        this.$store.dispatch('changeSourceText', val);
      },
    },
  },
  methods: {
    onClear() {
      this.$store.dispatch('clearTargetText');
    },
  },
};
</script>

<style scoped>

</style>
