<template>
  <div>
    <v-toolbar-title class="text-center mb-4">
      {{ title }}
    </v-toolbar-title>

    <v-card class="mb-4" elevation="1">
      <v-card-text>
        <slot name="top" />
        <slot />
      </v-card-text>
    </v-card>

    <div v-if="showBottom" class="text-center">
      <span v-if="bottomText" v-text="bottomText" />
      <router-link v-if="bottomLink" :to="bottomLink">{{ bottomLinkText }}</router-link>.
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    showBottom: {
      type: Boolean,
      default: true,
    },
    bottomText: {
      type: String,
      default: null,
    },
    bottomLink: {
      type: [String, Object],
      default: null,
    },
    bottomLinkText: {
      type: String,
      default: null,
    },
  },
};
</script>
