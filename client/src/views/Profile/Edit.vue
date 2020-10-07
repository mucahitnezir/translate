<template>
  <v-row>
    <v-col cols="12" class="pt-0">
      <UpdateProfileForm />
    </v-col>
    <v-col cols="12" md="6">
      <UpdateEmailForm />
    </v-col>
    <v-col cols="12" md="6">
      <UpdatePasswordForm />
    </v-col>
  </v-row>
</template>

<script>
import UpdateEmailForm from '@/components/Profile/UpdateEmailForm.vue';
import UpdateProfileForm from '@/components/Profile/UpdateProfileForm.vue';
import UpdatePasswordForm from '@/components/Profile/UpdatePasswordForm.vue';

export default {
  name: 'Edit',
  components: {
    UpdatePasswordForm,
    UpdateEmailForm,
    UpdateProfileForm,
  },
};
</script>
