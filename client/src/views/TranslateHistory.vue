<template>
  <v-navigation-drawer app clipped right width="400">
    <template v-slot:prepend>
      <v-toolbar flat color="transparent">
        <v-toolbar-title>Translation History</v-toolbar-title>
        <v-spacer />
        <CloseButton to="/" />
      </v-toolbar>
      <v-divider />
    </template>
    <v-card v-for="translation in translations" :key="translation.id" flat tile>
      <v-toolbar dense flat color="transparent">
        <v-toolbar-title class="font-weight-regular" style="font-size: 16px">
          {{ translation.sourceLangCode.translated }}
          <v-icon>{{ icons.mdiChevronRight }}</v-icon>
          {{ translation.targetLangCode }}
        </v-toolbar-title>
        <v-spacer />
        <ActionButton
          :icon="icons.mdiDeleteOutline"
          tooltip="Remove from History"
          left
          :top="false"
          @click="removeTranslation(translation.ref)"
        />
      </v-toolbar>
      <v-card-text class="pt-0">
        <p class="mb-1" style="color: #202124;">{{ translation.sourceText }}</p>
        <p class="mb-0" style="color: #5f6368;">{{ translation.targetText }}</p>
      </v-card-text>
      <v-divider />
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
import { mdiChevronRight, mdiDeleteOutline } from '@mdi/js';

import { firestore } from '@/firebase';

import CloseButton from '@/components/Shared/CloseButton.vue';
import ActionButton from '@/components/Shared/ActionButton.vue';

export default {
  name: 'TranslateHistory',
  components: { ActionButton, CloseButton },
  data: () => ({
    unsubscribe: null,
    translations: [],
    icons: { mdiChevronRight, mdiDeleteOutline },
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
          ref: doc.ref,
          ...doc.data(),
        }));
      });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    removeTranslation(documentRef) {
      documentRef.delete()
        .catch((err) => {
          this.$store.dispatch('notification/setSnackText', err.message);
        });
    },
  },
};
</script>
