<template>
  <div class="d-flex flex-column align-center mx-6">
    <v-btn
      icon
      x-large
      :to="to"
      class="pa-8 mb-2"
      style="border: 1px solid #ddd;"
      @click="$emit('click')"
    >
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'FooterButton',
  props: {
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    to: {
      type: [String, Object],
      default: undefined,
    },
  },
};
</script>
