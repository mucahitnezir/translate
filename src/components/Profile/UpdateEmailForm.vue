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
          :append-icon="icons.mdiEmail"
          :rules="[rules.required]"
          label="Email Address"
        />
        <v-btn
          :loading="isLoading"
          :disabled="!formValid"
          type="submit"
          color="success"
          depressed
        >
          Update
        </v-btn>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
import { cloneDeep } from 'lodash';
import { mdiEmail } from '@mdi/js';

export default {
  name: 'UpdateEmailForm',
  data() {
    const authUser = cloneDeep(this.$store.getters['auth/authUser']);

    return {
      isLoading: false,
      formValid: false,
      icons: {
        mdiEmail,
      },
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
