<template>
  <div>
    <div class="d-flex align-center mb-2">
      <SourceLanguageSelect class="flex-1" />
      <ChangeLanguagesButton class="mx-1" />
      <TargetLanguageSelect class="flex-1" />
    </div>
    <v-card class="mb-3">
      <v-layout wrap>
        <v-flex xs12 md6>
          <div class="d-flex flex-column hp-100">
            <div class="bg-white flex-grow-1">
              <SourceInput />
            </div>
            <SourceActions />
          </div>
        </v-flex>
        <v-flex xs12 md6>
          <div class="d-flex flex-column hp-100">
            <div class="bg-target-gray flex-grow-1">
              <TargetInput />
            </div>
            <TargetActions />
          </div>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import ChangeLanguagesButton from '../components/Translate/ChangeLanguagesButton.vue';
import SourceActions from '../components/Translate/SourceActions.vue';
import SourceInput from '../components/Translate/SourceInput.vue';
import TargetActions from '../components/Translate/TargetActions.vue';
import TargetInput from '../components/Translate/TargetInput.vue';
import SourceLanguageSelect from '../components/Translate/SourceLanguageSelect.vue';
import TargetLanguageSelect from '../components/Translate/TargetLanguageSelect.vue';

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
