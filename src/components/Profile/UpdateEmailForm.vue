<template>
  <v-form
    v-model="formValid"
    ref="form"
    @submit.prevent="onFormSubmit"
  >
    <v-card elevation="2">
      <v-card-title>Update Your Email</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="formData.email"
          :rules="[rules.required]"
          label="Email Address"
          hide-details
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          :loading="isLoading"
          :disabled="!formValid"
          type="submit"
          color="success"
          depressed
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { cloneDeep } from 'lodash';

export default {
  name: 'UpdateEmailForm',
  data() {
    const authUser = cloneDeep(this.$store.getters['auth/authUser']);

    return {
      isLoading: false,
      formValid: false,
      formData: {
        email: authUser.email,
      },
      rules: {
        required: v => !!v || 'This field is required',
      },
    };
  },
  methods: {
    onFormSubmit() {
      this.isLoading = true;
      this.$store.dispatch('auth/updateEmail', this.formData.email)
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>

</style>
