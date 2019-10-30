<template>
  <v-layout wrap>
    <v-flex xs12 class="mb-3">
      <h2 class="text-center">Login Page</h2>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-text>
          <v-form
            v-model="formValid"
            ref="form"
            @submit.prevent="onFormSubmit"
          >
            <v-text-field
              v-model="formData.email"
              :rules="rules.email"
              label="Email Address"
              required
            />
            <v-text-field
              v-model="formData.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="rules.password"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              class="input-group--focused"
              required
              @click:append="showPassword = !showPassword"
            />
            <div class="d-flex">
              <v-spacer />
              <v-btn :disabled="!formValid" type="submit" color="primary" depressed>Login</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    formData: {
      email: '',
      password: '',
    },
    formValid: false,
    rules: {
      email: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: [
        v => !!v || 'Password is required',
      ],
    },
    showPassword: false,
  }),
  methods: {
    onFormSubmit() {
      this.$store.dispatch('auth/login', this.formData)
        .then(() => {
          const { redirect } = this.$route.query;
          const redirectedUrl = redirect || { name: 'home' };
          this.$router.push(redirectedUrl);
        })
        .catch((err) => {
          const notification = {
            type: 'error',
            message: err.message,
          };
          this.$store.dispatch('notification/add', notification);
        });
    },
  },
};
</script>

<style scoped>

</style>
