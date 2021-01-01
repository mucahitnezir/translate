<template>
  <UpdateForm ref="form" title="Update Your Password" @submit="onFormSubmit">
    <PasswordInput
      v-model="formData.password"
      :outlined="false"
      :rules="[formRules.required('Password')]"
    />
  </UpdateForm>
</template>

<script>
import UpdateForm from './UpdateForm.vue';
import formMixin from '@/mixins/formMixin';

import PasswordInput from '@/components/Shared/PasswordInput.vue';

export default {
  name: 'UpdatePasswordForm',
  mixins: [formMixin],
  components: { PasswordInput, UpdateForm },
  data() {
    return {
      formData: {
        password: '',
      },
    };
  },
  methods: {
    onFormSubmit() {
      this.$refs.form.loading = true;
      this.$store.dispatch('auth/updatePassword', this.formData.password)
        .finally(() => {
          this.$refs.form.loading = false;
        });
    },
  },
};
</script>
