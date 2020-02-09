<template>
  <v-form
    v-model="formValid"
    ref="form"
    @submit.prevent="onFormSubmit"
  >
    <v-card elevation="2">
      <v-card-title>Update Your Password</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="formData.password"
          :append-icon="showPassword ? icons.mdiEye : icons.mdiEyeOff"
          :rules="[rules.required]"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          @click:append="showPassword = !showPassword"
        />
        <v-btn
          :loading="isLoading"
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
import { mdiEye, mdiEyeOff } from '@mdi/js';

export default {
  name: 'UpdatePasswordForm',
  data() {
    return {
      isLoading: false,
      formValid: false,
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
      this.isLoading = true;
      this.$store.dispatch('auth/updatePassword', this.formData.password)
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>

</style>
