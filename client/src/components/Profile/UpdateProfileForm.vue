<template>
  <UpdateForm ref="form" title="Update Your Profile" @submit="onFormSubmit">
    <v-text-field
      v-model="formData.displayName"
      :rules="[rules.required]"
      label="Display Name"
    />
  </UpdateForm>
</template>

<script>
import { cloneDeep } from 'lodash';

import UpdateForm from '@/components/Profile/UpdateForm.vue';

export default {
  name: 'UpdateProfileForm',
  components: { UpdateForm },
  data() {
    const authUser = cloneDeep(this.$store.getters['auth/authUser']);

    return {
      formData: {
        displayName: authUser.displayName,
      },
      rules: {
        required: v => !!v || 'This field is required',
      },
    };
  },
  methods: {
    onFormSubmit() {
      this.$refs.form.loading = true;
      this.$store.dispatch('auth/updateProfile', this.formData)
        .finally(() => {
          this.$refs.form.loading = false;
        });
    },
  },
};
</script>
