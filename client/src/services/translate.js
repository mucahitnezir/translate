import { translate } from './aws';

const baseLanguages = [
  { value: 'ar', text: 'Arabic' },
  { value: 'zh', text: 'Chinese (Simplified)' },
  { value: 'zh-TW', text: 'Chinese (Traditional)' },
  { value: 'cs', text: 'Czech' },
  { value: 'da', text: 'Danish' },
  { value: 'nl', text: 'Dutch' },
  { value: 'en', text: 'English' },
  { value: 'fi', text: 'Finnish' },
  { value: 'fr', text: 'French' },
  { value: 'de', text: 'German' },
  { value: 'he', text: 'Hebrew' },
  { value: 'id', text: 'Indonesian' },
  { value: 'it', text: 'Italian' },
  { value: 'ja', text: 'Japanese' },
  { value: 'ko', text: 'Korean' },
  { value: 'pl', text: 'Polish' },
  { value: 'pt', text: 'Portuguese' },
  { value: 'ru', text: 'Russian' },
  { value: 'es', text: 'Spanish' },
  { value: 'sv', text: 'Swedish' },
  { value: 'tr', text: 'Turkish' },
];

export const sourceLanguages = [
  { value: 'auto', text: 'Auto Detect' },
  ...baseLanguages,
];

export const targetLanguages = baseLanguages;

export const translateText = params => new Promise((resolve, reject) => {
  translate.translateText(params, (err, response) => {
    if (err) {
      reject(err);
    } else {
      resolve(response);
    }
  });
});
