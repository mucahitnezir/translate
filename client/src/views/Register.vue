<template>
  <v-row>
    <v-col cols="12">
      <h2 class="text-center">Register Page</h2>
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
              v-model="formData.displayName"
              :rules="rules.displayName"
              label="Display Name"
              required
            />
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
              >Register</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mdiEye, mdiEyeOff } from '@mdi/js';

import { functions } from '@/firebase';

export default {
  name: 'Register',
  data: () => ({
    icons: {
      mdiEye,
      mdiEyeOff,
    },
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
    showPassword: false,
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
