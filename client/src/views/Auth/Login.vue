<template>
  <v-form v-model="formValid" @submit.prevent="onFormSubmit">
    <v-text-field
      v-model="formData.email"
      :rules="[formRules.required('Email address'), formRules.email]"
      label="Email Address"
      outlined
      required
    />
    <PasswordInput v-model="formData.password" :rules="[formRules.required('Password')]" />
    <div class="d-flex">
      <PasswordResetForm />
      <v-spacer />
      <v-btn
        :disabled="!formValid"
        :loading="formLoading"
        type="submit"
        color="primary"
        depressed
      >
        Login
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import formMixin from '@/mixins/formMixin';

import PasswordInput from '@/components/Shared/PasswordInput.vue';
import PasswordResetForm from '@/components/Auth/PasswordResetForm.vue';

export default {
  name: 'Login',
  mixins: [formMixin],
  components: {
    PasswordInput,
    PasswordResetForm,
  },
  data: () => ({
    formData: {
      email: '',
      password: '',
    },
  }),
  methods: {
    onFormSubmit() {
      this.formLoading = true;
      this.$store.dispatch('auth/login', this.formData)
        .then(() => {
          // Redirect user
          const { redirect } = this.$route.query;
          const redirectedUrl = redirect || { name: 'home' };
          this.$router.push(redirectedUrl);
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
