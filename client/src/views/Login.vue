<template>
  <v-row>
    <v-col cols="12">
      <h2 class="text-center">Login Page</h2>
    </v-col>
    <v-col sm="6" offset-sm="3">
      <v-card class="mb-4">
        <v-card-text>
          <v-form
            v-model="formValid"
            ref="form"
            @submit.prevent="onFormSubmit"
          >
            <v-text-field
              v-model="formData.email"
              :rules="rules.email"
              label="Email Address"
              required
            />
            <v-text-field
              v-model="formData.password"
              :append-icon="showPassword ? icons.mdiEye : icons.mdiEyeOff"
              :rules="rules.password"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              class="input-group--focused"
              required
              @click:append="showPassword = !showPassword"
            />
            <div class="d-flex">
              <v-spacer />
              <v-btn
                :disabled="!formValid"
                :loading="isLoading"
                type="submit"
                color="primary"
                depressed
              >Login</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
      <PasswordResetForm />
    </v-col>
  </v-row>
</template>

<script>
import { mdiEye, mdiEyeOff } from '@mdi/js';

import PasswordResetForm from '@/components/Auth/PasswordResetForm.vue';

export default {
  name: 'Login',
  components: {
    PasswordResetForm,
  },
  data: () => ({
    icons: {
      mdiEye,
      mdiEyeOff,
    },
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
    showPassword: false,
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
          const notification = {
            type: 'error',
            message: err.message,
          };
          this.$store.dispatch('notification/add', notification);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
