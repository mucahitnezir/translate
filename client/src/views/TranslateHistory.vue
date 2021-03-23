<template>
  <RightPanel title="Translation History">
    <div v-if="loading" class="text-center mt-4">
      <v-progress-circular indeterminate />
    </div>
    <template v-else-if="translations.length > 0">
      <v-card v-for="translation in translations" :key="translation.id" flat tile>
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="font-weight-regular" style="font-size: 16px">
            {{ translation.sourceLangCode.translated | lang }}
            <v-icon>{{ icons.mdiChevronRight }}</v-icon>
            {{ translation.targetLangCode | lang }}
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
          <p class="mb-1 font-weight-bold">{{ translation.sourceText }}</p>
          <p class="mb-0">{{ translation.targetText }}</p>
        </v-card-text>
        <v-divider />
      </v-card>
    </template>
    <div v-else class="d-flex flex-column align-center mt-12">
      <v-img :src="require('@/assets/desert.png')" class="mb-6" max-width="250" />
      <p class="mb-0">
        There is no translation history.
      </p>
    </div>
  </RightPanel>
</template>

<script>
import { mapState } from 'vuex';
import { mdiChevronRight, mdiDeleteOutline } from '@mdi/js';

import { firestore } from '@/firebase';

import RightPanel from '@/components/Layout/RightPanel.vue';
import ActionButton from '@/components/Shared/ActionButton.vue';

export default {
  name: 'TranslateHistory',
  components: { RightPanel, ActionButton },
  data: () => ({
    unsubscribe: null,
    translations: [],
    loading: false,
    icons: { mdiChevronRight, mdiDeleteOutline },
  }),
  computed: mapState('auth', ['user']),
  mounted() {
    this.loading = true;
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
        // Disable loading
        this.loading = false;
      }, () => {
        this.$store.dispatch('notification/setSnackText', 'Cannot access to history');
      }, () => {
        this.loading = false;
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
