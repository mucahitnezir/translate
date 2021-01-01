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
            <PasswordInput v-model="formData.password" :rules="rules.password" />
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
