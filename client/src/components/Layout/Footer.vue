<template>
  <v-footer
    padless
    color="white"
  >
    <v-col cols="12" class="text-center">
      &copy; {{ new Date().getFullYear() }}
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>
