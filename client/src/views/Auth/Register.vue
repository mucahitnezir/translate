<template>
  <AuthCard
    title="Create Your Account"
    bottom-text="Already have an account? "
    :bottom-link="{ name: 'login' }"
    bottom-link-text="Sign in"
  >
    <v-form v-model="formValid" @submit.prevent="onFormSubmit">
      <v-text-field
        v-model="formData.displayName"
        label="Display Name"
        :rules="[formRules.required('Display name')]"
      />
      <v-text-field
        v-model="formData.email"
        label="Email Address"
        :rules="[formRules.required('Email address'), formRules.email]"
      />
      <PasswordInput
        v-model="formData.password"
        :outlined="false"
        :rules="[formRules.required('Password')]"
      />
      <AuthButton :disabled="!formValid" :loading="formLoading">
        Create account
      </AuthButton>
    </v-form>
  </AuthCard>
</template>

<script>
import { functions } from '@/firebase';

import formMixin from '@/mixins/formMixin';
import AuthCard from '@/components/Auth/AuthCard.vue';
import AuthButton from '@/components/Auth/AuthButton.vue';
import PasswordInput from '@/components/Shared/PasswordInput.vue';

export default {
  name: 'Register',
  mixins: [formMixin],
  components: { AuthButton, AuthCard, PasswordInput },
  data: () => ({
    formData: {
      email: '',
      displayName: '',
      password: '',
    },
  }),
  methods: {
    onFormSubmit() {
      this.formLoading = true;
      functions.httpsCallable('register')(this.formData)
        .then(() => {
          // Auto login for user
          const payload = { email: this.formData.email, password: this.formData.password };
          this.$store.dispatch('auth/login', payload)
            .then(() => {
              const message = 'Your account has been created successfully.';
              this.$store.dispatch('notification/setSnackText', message);
              this.$router.push({ name: 'home' });
            })
            .catch(() => {
              const message = 'Your account has been created, but the login could not be provided. Please login with the information you have registered.';
              this.$store.dispatch('notification/setSnackText', message);
              this.$router.push({ name: 'login' });
            });
        })
        .catch((err) => {
          // Create notification
          this.$store.dispatch('notification/setSnackText', err.message);
        })
        .finally(() => {
          this.formLoading = false;
        });
    },
  },
};
</script>
