<template>
  <v-form
    v-model="formValid"
    ref="form"
    @submit.prevent="onFormSubmit"
  >
    <v-card elevation="2">
      <v-card-title>Update Your Profile</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="formData.displayName"
          :rules="[rules.required]"
          label="Display Name"
        />
        <v-text-field
          v-model="formData.photoURL"
          label="Photo URL"
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
  name: 'UpdateProfileForm',
  data() {
    const authUser = cloneDeep(this.$store.getters['auth/authUser']);

    return {
      isLoading: false,
      formValid: false,
      formData: {
        displayName: authUser.displayName,
        photoURL: authUser.photoURL,
      },
      rules: {
        required: v => !!v || 'This field is required',
      },
    };
  },
  methods: {
    onFormSubmit() {
      this.isLoading = true;
      this.$store.dispatch('auth/updateProfile', this.formData)
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>

</style>
