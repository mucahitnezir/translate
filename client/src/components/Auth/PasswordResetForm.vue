<template>
  <v-dialog v-model="dialog" persistent max-width="570px">
    <template v-slot:activator="{ on }">
      <v-btn class="text-capitalize" v-on="on" text>Forgot your password?</v-btn>
    </template>
    <v-form v-model="formValid" @submit.prevent="onFormSubmit">
      <v-card>
        <v-card-title>Reset Your Password</v-card-title>
        <v-divider />
        <v-card-text>
          <v-text-field
            v-model="formData.email"
            :error-messages="errors"
            :rules="[v => !!v || 'E-mail is required']"
            label="Email Address"
            outlined
            @input="onTyped"
          />
          <div class="d-flex">
            <v-spacer />
            <v-btn text @click="dialog = false">Close</v-btn>
            <v-btn
              :loading="isLoading"
              :disabled="!formValid"
              color="success"
              type="submit"
              depressed
            >
              Send
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { auth } from '@/firebase';

export default {
  name: 'PasswordResetForm',
  data: () => ({
    dialog: false,
    errors: [],
    formData: {
      email: '',
    },
    isLoading: false,
    formValid: false,
  }),
  methods: {
    onFormSubmit() {
      this.isLoading = true;
      auth.sendPasswordResetEmail(this.formData.email)
        .then(() => {
          // Hide dialog
          this.dialog = false;
          // Show notification message
          const message = 'Your email sent!';
          this.$store.dispatch('notification/setSnackText', message);
          // Clear data
          this.clearData();
        })
        .catch((err) => {
          this.errors = [err.message];
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    clearData() {
      this.errors = [];
      this.formData.email = '';
    },
    onTyped() {
      if (this.errors.length > 0) {
        this.errors = [];
      }
    },
  },
};
</script>
