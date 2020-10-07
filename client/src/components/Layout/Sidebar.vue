<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    hide-overlay
    temporary
    disable-resize-watcher
  >
    <v-list dense nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.to"
        link
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  data: () => ({
    menuItems: [
      { title: 'About Translate', to: { name: 'about' } },
    ],
  }),
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        if (this.drawer !== value) {
          this.$store.dispatch('changeDrawerStatus', value);
        }
      },
    },
  },
};
</script>
