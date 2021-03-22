<template>
  <v-navigation-drawer app clipped right width="400">
    <div class="d-flex align-center pa-4">
      <h3>Translation History</h3>
      <v-spacer />
      <CloseButton to="/" />
    </div>
    <v-divider />
    <v-list color="transparent">
      <v-list-item v-for="translation in translations" :key="translation.id">
        <v-list-item-content>
          <v-list-item-title>
            {{ `[${translation.sourceLangCode.translated }] ${translation.sourceText}` }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ `[${translation.targetLangCode }] ${translation.targetText}` }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="removeTranslation(translation)">
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
import { mdiClose } from '@mdi/js';

import { firestore } from '@/firebase';

import CloseButton from '@/components/Shared/CloseButton.vue';

export default {
  name: 'TranslateHistory',
  components: { CloseButton },
  data: () => ({
    unsubscribe: null,
    translations: [],
    icons: { mdiClose },
  }),
  computed: mapState('auth', ['user']),
  mounted() {
    this.unsubscribe = firestore
      .collection('users')
      .doc(this.user.uid)
      .collection('translations')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .onSnapshot((querySnapshot) => {
        this.translations = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    removeTranslation(translation) {
      firestore
        .collection('users')
        .doc(this.user.uid)
        .collection('translations')
        .doc(translation.id)
        .delete()
        .catch((err) => {
          this.$store.dispatch('notification/setSnackText', err.message);
        });
    },
  },
};
</script>
