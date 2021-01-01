<template>
  <UpdateForm ref="form" title="Update Your Email" @submit="onFormSubmit">
    <v-text-field
      v-model="formData.email"
      :append-icon="icons.mdiEmail"
      :rules="[formRules.required('Email address'), formRules.email]"
      label="Email Address"
    />
  </UpdateForm>
</template>

<script>
import { mdiEmail } from '@mdi/js';

import UpdateForm from './UpdateForm.vue';
import formMixin from '@/mixins/formMixin';

export default {
  name: 'UpdateEmailForm',
  mixins: [formMixin],
  components: { UpdateForm },
  data() {
    const authUser = Object.assign({}, this.$store.getters['auth/authUser']);

    return {
      icons: {
        mdiEmail,
      },
      formData: {
        email: authUser.email,
      },
    };
  },
  methods: {
    onFormSubmit() {
      this.$refs.form.loading = true;
      this.$store.dispatch('auth/updateEmail', this.formData.email)
        .finally(() => {
          this.$refs.form.loading = false;
        });
    },
  },
};
</script>
