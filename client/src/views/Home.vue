<template>
  <div>
    <!-- Language Buttons -->
    <div class="d-flex align-center mb-2">
      <SourceLanguageSelect class="flex-1" />
      <ChangeLanguagesButton class="mx-1" />
      <TargetLanguageSelect class="flex-1" />
    </div>
    <!-- // Language Buttons -->

    <!-- Translate Inputs -->
    <v-card class="mb-3 overflow-hidden">
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-card class="d-flex flex-column hp-100" flat tile>
            <div class="flex-grow-1">
              <SourceInput />
            </div>
            <SourceActions />
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="d-flex flex-column hp-100" flat tile color="targetBackground">
            <div class="flex-grow-1">
              <TargetInput />
            </div>
            <TargetActions />
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <!-- // Translate Inputs -->
  </div>
</template>

<script>
import ChangeLanguagesButton from '@/components/Translate/ChangeLanguagesButton.vue';
import SourceActions from '@/components/Translate/SourceActions.vue';
import SourceInput from '@/components/Translate/SourceInput.vue';
import TargetActions from '@/components/Translate/TargetActions.vue';
import TargetInput from '@/components/Translate/TargetInput.vue';
import SourceLanguageSelect from '@/components/Translate/SourceLanguageSelect.vue';
import TargetLanguageSelect from '@/components/Translate/TargetLanguageSelect.vue';

export default {
  name: 'Home',
  components: {
    ChangeLanguagesButton,
    TargetLanguageSelect,
    SourceLanguageSelect,
    SourceActions,
    SourceInput,
    TargetActions,
    TargetInput,
  },
};
</script>
