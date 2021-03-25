<template>
  <v-row>
    <v-col cols="12" md="6" offset-md="3">
      <!--Profile Photo-->
      <div class="d-flex align-center justify-center mb-4">
        <v-img :src="authUser.photoURL" max-width="150" style="border-radius: 50%;" />
      </div>
      <!--// Profile Photo-->

      <p class="text-center">
        Your account is created at <b>{{ authUser.metadata.creationTime | datetime }}</b>.
      </p>

      <!--Display Name-->
      <v-text-field
        v-model="formData.displayName"
        outlined
        flat
        label="Display Name"
        :prepend-inner-icon="icons.mdiAccountOutline"
        @keyup.enter="onUpdateProfile"
      >
        <template v-slot:append>
          <v-progress-circular v-if="loading.displayName" size="24" color="info" indeterminate />
          <v-btn v-else text height="24" class="px-1" @click="onUpdateProfile">
            Update
          </v-btn>
        </template>
      </v-text-field>
      <!--// Display Name-->

      <!--Email-->
      <v-text-field
        v-model="formData.email"
        outlined
        flat
        label="Email Address"
        :prepend-inner-icon="icons.mdiEmailOutline"
        @keyup.enter="onUpdateEmail"
      >
        <template v-slot:append>
          <div class="d-flex align-center justify-center">
            <ActionButton
              v-if="!authUser.emailVerified"
              :icon="icons.mdiEmailCheckOutline"
              :loading="loading.verification"
              tooltip="Confirm"
              height="24"
              @click="sendEmailVerification"
            />

            <v-progress-circular v-if="loading.email" size="24" color="info" indeterminate />
            <v-btn v-else text height="24" class="px-1" @click="onUpdateEmail">
              Update
            </v-btn>
          </div>
        </template>
      </v-text-field>
      <!--// Email-->

      <!--Password-->
      <v-text-field
        v-model="formData.password"
        outlined
        flat
        label="Password"
        type="password"
        hint="Just fill in this input when you want to change your password."
        persistent-hint
        :prepend-inner-icon="icons.mdiLockOutline"
        @keyup.enter="onUpdatePassword"
      >
        <template v-slot:append>
          <v-progress-circular v-if="loading.password" size="24" color="info" indeterminate />
          <v-btn v-else text height="24" class="px-1" @click="onUpdatePassword">
            Update
          </v-btn>
        </template>
      </v-text-field>
      <!--// Password-->
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  mdiAccountOutline, mdiEmailCheckOutline, mdiEmailOutline, mdiLockOutline,
} from '@mdi/js';
import ActionButton from '@/components/Shared/ActionButton.vue';

export default {
  name: 'Profile',
  components: { ActionButton },
  data() {
    const authUser = Object.assign({}, this.$store.getters['auth/authUser']);

    return {
      formData: {
        displayName: authUser.displayName,
        email: authUser.email,
        password: '',
      },
      loading: {
        displayName: false,
        email: false,
        password: false,
        verification: false,
      },
      icons: {
        mdiLockOutline, mdiEmailCheckOutline, mdiEmailOutline, mdiAccountOutline,
      },
    };
  },
  computed: mapGetters('auth', ['authUser']),
  metaInfo: {
    title: 'Update Profile',
  },
  methods: {
    onUpdateProfile() {
      if (!this.formData.displayName) {
        this.$store.dispatch('notification/setSnackText', 'Empty display name!');
        return;
      }
      this.loading.displayName = true;

      const payload = { displayName: this.formData.displayName };
      this.$store.dispatch('auth/updateProfile', payload)
        .finally(() => {
          this.loading.displayName = false;
        });
    },
    onUpdateEmail() {
      if (!this.formData.email) {
        this.$store.dispatch('notification/setSnackText', 'Empty email address!');
        return;
      }

      this.loading.email = true;
      this.$store.dispatch('auth/updateEmail', this.formData.email)
        .then(() => {
          this.sendEmailVerification();
        })
        .finally(() => {
          this.loading.email = false;
        });
    },
    onUpdatePassword() {
      if (!this.formData.password) {
        this.$store.dispatch('notification/setSnackText', 'Empty password!');
        return;
      }

      this.loading.password = true;
      this.$store.dispatch('auth/updatePassword', this.formData.password)
        .finally(() => {
          this.loading.password = false;
        });
    },
    sendEmailVerification() {
      if (!this.authUser.emailVerified) {
        this.loading.verification = true;
        this.$store.dispatch('auth/sendEmailVerification')
          .finally(() => {
            this.loading.verification = false;
          });
      }
    },
  },
};
</script>
