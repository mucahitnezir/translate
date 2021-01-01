<template>
  <v-row>
    <v-col cols="12" md="6" offset-md="3">
      <v-card>
        <v-tabs centered optional>
          <v-tab :to="{ name: 'login' }">
            Login
          </v-tab>
          <v-tab :to="{ name: 'register' }">
            Register
          </v-tab>
        </v-tabs>
        <v-divider />
        <v-card-text>
          <router-view />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
export default {
  name: 'Auth',
};
</script>
