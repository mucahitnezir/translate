<template>
  <v-tooltip :top="top" :left="left">
    <template v-slot:activator="{ on }">
      <v-btn
        :disabled="disabled"
        :loading="loading"
        :height="height"
        text
        icon
        v-on="on"
        @click="$emit('click')"
      >
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      required: true,
    },
    height: {
      type: [String, Number],
      default: undefined
    },
    tooltip: {
      type: String,
      required: true,
    },
    top: {
      type: Boolean,
      default: true,
    },
    left: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
