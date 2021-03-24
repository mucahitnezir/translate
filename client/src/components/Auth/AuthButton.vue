<template>
  <v-btn
    block
    depressed
    type="submit"
    color="primary"
    class="text-none"
    :loading="loading"
    :disabled="disabled"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: 'AuthButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
