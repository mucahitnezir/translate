<template>
  <v-form v-model="formValid" @submit.prevent="onFormSubmit">
    <v-text-field
      v-model="formData.email"
      :rules="rules.email"
      label="Email Address"
      outlined
      required
    />
    <PasswordInput v-model="formData.password" :rules="rules.password" />
    <div class="d-flex">
      <PasswordResetForm />
      <v-spacer />
      <v-btn
        :disabled="!formValid"
        :loading="isLoading"
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
import PasswordInput from '@/components/Shared/PasswordInput.vue';
import PasswordResetForm from '@/components/Auth/PasswordResetForm.vue';

export default {
  name: 'Login',
  components: {
    PasswordInput,
    PasswordResetForm,
  },
  data: () => ({
    formData: {
      email: '',
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
    },
  }),
  methods: {
    onFormSubmit() {
      this.isLoading = true;
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
          this.isLoading = false;
        });
    },
  },
};
</script>
