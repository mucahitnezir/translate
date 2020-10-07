<template>
  <UpdateForm ref="form" title="Update Your Email" @submit="onFormSubmit">
    <v-text-field
      v-model="formData.email"
      :append-icon="icons.mdiEmail"
      :rules="[rules.required]"
      label="Email Address"
    />
  </UpdateForm>
</template>

<script>
import { cloneDeep } from 'lodash';
import { mdiEmail } from '@mdi/js';

import UpdateForm from './UpdateForm.vue';

export default {
  name: 'UpdateEmailForm',
  components: { UpdateForm },
  data() {
    const authUser = cloneDeep(this.$store.getters['auth/authUser']);

    return {
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
      this.$refs.form.loading = true;
      this.$store.dispatch('auth/updateEmail', this.formData.email)
        .finally(() => {
          this.$refs.form.loading = false;
        });
    },
  },
};
</script>
