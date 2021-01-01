<template>
  <UpdateForm ref="form" title="Update Your Profile" @submit="onFormSubmit">
    <v-text-field
      v-model="formData.displayName"
      :rules="[formRules.required('Display name')]"
      label="Display Name"
    />
  </UpdateForm>
</template>

<script>
import formMixin from '@/mixins/formMixin';
import UpdateForm from '@/components/Profile/UpdateForm.vue';

export default {
  name: 'UpdateProfileForm',
  mixins: [formMixin],
  components: { UpdateForm },
  data() {
    const authUser = Object.assign({}, this.$store.getters['auth/authUser']);

    return {
      formData: {
        displayName: authUser.displayName,
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
