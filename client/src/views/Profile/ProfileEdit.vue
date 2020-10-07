<template>
  <div>
    <UpdateProfileForm class="mb-2" />
    <v-row>
      <v-col cols="12" md="6">
        <UpdateEmailForm />
      </v-col>
      <v-col cols="12" md="6">
        <UpdatePasswordForm />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UpdateProfileForm from '@/components/Profile/UpdateProfileForm.vue';
import UpdateEmailForm from '@/components/Profile/UpdateEmailForm.vue';
import UpdatePasswordForm from '@/components/Profile/UpdatePasswordForm.vue';

export default {
  name: 'ProfileEdit',
  components: {
    UpdatePasswordForm,
    UpdateEmailForm,
    UpdateProfileForm,
  },
};
</script>
