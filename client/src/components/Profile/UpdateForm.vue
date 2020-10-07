<template>
  <v-form
    v-model="formValid"
    ref="form"
    @submit.prevent="$emit('submit')"
  >
    <v-card elevation="2">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <slot />
        <v-btn
          :loading="loading"
          :disabled="!formValid"
          type="submit"
          color="success"
          depressed
        >
          Update
        </v-btn>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'CardForm',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    formValid: false,
  }),
};
</script>
