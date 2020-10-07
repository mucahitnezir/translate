<template>
  <v-textarea
    v-model="inputValue"
    auto-grow
    background-color="white"
    clearable
    counter
    :readonly="readonly"
    flat
    label="Source Text"
    :maxlength="100"
    solo
    @click:clear="onClear"
  />
</template>

<script>
export default {
  name: 'SourceInput',
  computed: {
    readonly() {
      return this.$store.state.translate.isTranslating;
    },
    inputValue: {
      get() {
        return this.$store.state.translate.sourceText;
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
