<template>
  <v-form v-model="formValid" @submit.prevent="onFormSubmit"
  >
    <v-text-field
      v-model="formData.displayName"
      :rules="rules.displayName"
      label="Display Name"
      outlined
      required
    />
    <v-text-field
      v-model="formData.email"
      :rules="rules.email"
      label="Email Address"
      outlined
      required
    />
    <PasswordInput v-model="formData.password" :rules="rules.password" />
    <div class="d-flex">
      <v-spacer />
      <v-btn
        :disabled="!formValid"
        :loading="isLoading"
        type="submit"
        color="primary"
        depressed
      >
        Register
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { functions } from '@/firebase';
import PasswordInput from '@/components/Shared/PasswordInput.vue';

export default {
  name: 'Register',
  components: { PasswordInput },
  data: () => ({
    formData: {
      email: '',
      displayName: '',
      password: '',
    },
    formValid: false,
    isLoading: false,
    rules: {
      email: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: [
        v => !!v || 'Password is required',
      ],
      displayName: [
        v => !!v || 'Display name is required',
      ],
    },
  }),
  methods: {
    onFormSubmit() {
      this.isLoading = true;
      functions.httpsCallable('register')(this.formData)
        .then(() => {
          this.$router.push({ name: 'login' });
        })
        .catch((err) => {
          // Create notification
          this.$store.dispatch('notification/setSnackText', err.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
