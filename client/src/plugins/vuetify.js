import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const darkOption = localStorage.getItem('vuetifyDarkTheme');
const isDarkTheme = darkOption === 'true';

export default new Vuetify({
  theme: {
    dark: isDarkTheme,
    themes: {
      light: {
        targetBackground: '#F5F5F5',
      },
      dark: {
        targetBackground: '#3A3A3A',
      },
    },
  },
  icons: {
    iconfont: 'mdiSvg',
  },
});
