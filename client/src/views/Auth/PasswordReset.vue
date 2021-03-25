<template>
  <AuthCard
    title="Reset your password"
    bottom-text="Do you remember your password? "
    :bottom-link="{ name: 'login' }"
    bottom-link-text="Sign in"
  >
    <template slot="top">
      Enter your user account's email address and we will send you a password reset link.
    </template>
    <v-form v-model="formValid" @submit.prevent="onFormSubmit">
      <v-text-field
        v-model="formData.email"
        label="Email Address"
        :rules="[formRules.required('Email address'), formRules.email]"
      />
      <AuthButton :disabled="!formValid" :loading="formLoading">
        Send password reset email
      </AuthButton>
    </v-form>
  </AuthCard>
</template>

<script>
import { auth } from '@/firebase';

import formMixin from '@/mixins/formMixin';
import AuthCard from '@/components/Auth/AuthCard.vue';
import AuthButton from '@/components/Auth/AuthButton.vue';

export default {
  name: 'PasswordReset',
  mixins: [formMixin],
  components: { AuthButton, AuthCard },
  data: () => ({
    formData: {
      email: '',
    },
  }),
  metaInfo: {
    title: 'Forgot your password?',
  },
  methods: {
    onFormSubmit() {
      this.formLoading = true;
      auth.sendPasswordResetEmail(this.formData.email)
        .then(() => {
          // Show notification message
          const message = 'Your email sent!';
          this.$store.dispatch('notification/setSnackText', message);
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
