<template>
  <UpdateForm ref="form" title="Update Your Password" @submit="onFormSubmit">
    <v-text-field
      v-model="formData.password"
      :append-icon="showPassword ? icons.mdiEye : icons.mdiEyeOff"
      :rules="[rules.required]"
      :type="showPassword ? 'text' : 'password'"
      label="Password"
      @click:append="showPassword = !showPassword"
    />
  </UpdateForm>
</template>

<script>
import { mdiEye, mdiEyeOff } from '@mdi/js';

import UpdateForm from './UpdateForm.vue';

export default {
  name: 'UpdatePasswordForm',
  components: { UpdateForm },
  data() {
    return {
      icons: {
        mdiEye,
        mdiEyeOff,
      },
      showPassword: false,
      formData: {
        password: '',
      },
      rules: {
        required: v => !!v || 'This field is required',
      },
    };
  },
  methods: {
    onFormSubmit() {
      this.$refs.form.loading = true;
      this.$store.dispatch('auth/updatePassword', this.formData.password)
        .finally(() => {
          this.$refs.form.loading = false;
        });
    },
  },
};
</script>
