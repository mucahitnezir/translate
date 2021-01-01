<template>
  <v-form v-model="formValid" @submit.prevent="onFormSubmit"
  >
    <v-text-field
      v-model="formData.displayName"
      :rules="[formRules.required('Display name')]"
      label="Display Name"
      outlined
      required
    />
    <v-text-field
      v-model="formData.email"
      :rules="[formRules.required('Email address'), formRules.email]"
      label="Email Address"
      outlined
      required
    />
    <PasswordInput v-model="formData.password" :rules="[formRules.required('Password')]" />
    <div class="d-flex">
      <v-spacer />
      <v-btn
        :disabled="!formValid"
        :loading="formLoading"
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

import formMixin from '@/mixins/formMixin';
import PasswordInput from '@/components/Shared/PasswordInput.vue';

export default {
  name: 'Register',
  mixins: [formMixin],
  components: { PasswordInput },
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
          this.$router.push({ name: 'login' });
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
