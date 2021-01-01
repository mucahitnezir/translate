<template>
  <v-text-field
    v-model="password"
    :append-icon="showPassword ? icons.mdiEye : icons.mdiEyeOff"
    :label="label"
    :rules="rules"
    :type="showPassword ? 'text' : 'password'"
    class="input-group--focused"
    :outlined="outlined"
    required
    @click:append="showPassword = !showPassword"
  />
</template>

<script>
import { mdiEye, mdiEyeOff } from '@mdi/js';

export default {
  name: 'PasswordInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'Password',
    },
    rules: {
      type: Array,
      default() {
        return [];
      },
    },
    outlined: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showPassword: false,
      icons: { mdiEye, mdiEyeOff },
    };
  },
  computed: {
    password: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
