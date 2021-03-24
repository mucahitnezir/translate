<template>
  <AuthCard
    title="Sign in to Translate"
    bottom-text="Don't you have an account? "
    :bottom-link="{ name: 'register' }"
    bottom-link-text="Create an account"
  >
    <v-form v-model="formValid" class="mb-4" @submit.prevent="onFormSubmit">
      <v-text-field
        v-model="formData.email"
        label="Email Address"
        :rules="[formRules.required('Email address'), formRules.email]"
        required
      />
      <PasswordInput
        v-model="formData.password"
        :outlined="false"
        :rules="[formRules.required('Password')]"
      />
      <AuthButton :disabled="!formValid" :loading="formLoading">
        Sign in
      </AuthButton>
    </v-form>
    <div class="text-center">
      <router-link :to="{ name: 'password-reset' }">
        Forgot password?
      </router-link>
    </div>
  </AuthCard>
</template>

<script>
import formMixin from '@/mixins/formMixin';

import AuthCard from '@/components/Auth/AuthCard.vue';
import AuthButton from '@/components/Auth/AuthButton.vue';
import PasswordInput from '@/components/Shared/PasswordInput.vue';

export default {
  name: 'Login',
  mixins: [formMixin],
  components: {
    AuthButton,
    AuthCard,
    PasswordInput,
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
