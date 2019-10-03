<template>
  <v-card>
    <div class="d-flex align-center" style="border-bottom: 1px solid #DDD;">
      <v-tabs>
        <v-tab>
          Auto Detect
        </v-tab>
        <v-tab v-for="(lang, index) in languages" :key="index">
          {{ lang.text }}
        </v-tab>
      </v-tabs>
      <v-btn text icon large>
        <v-icon>mdi-swap-horizontal</v-icon>
      </v-btn>
      <v-tabs>
        <v-tab v-for="(lang, index) in languages" :key="index">
          {{ lang.text }}
        </v-tab>
      </v-tabs>
    </div>
    <v-layout>
      <v-flex xs12 md6>
        <SourceInput />
        <SourceActions />
      </v-flex>
      <v-flex xs12 md6>
        <TargetInput />
        <TargetActions />
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import SourceActions from '../components/Translate/SourceActions.vue';
import SourceInput from '../components/Translate/SourceInput.vue';
import TargetActions from '../components/Translate/TargetActions.vue';
import TargetInput from '../components/Translate/TargetInput.vue';

export default {
  name: 'Home',
  components: {
    SourceActions,
    SourceInput,
    TargetActions,
    TargetInput,
  },
  data: () => ({
    languages: [
      { value: 'tr', text: 'Turkish' },
      { value: 'en', text: 'English' },
      { value: 'ru', text: 'Russian' },
      { value: 'it', text: 'Italian' },
    ],
  }),
};
</script>
