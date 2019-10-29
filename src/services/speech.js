import { polly } from './aws';

export const speechLanguages = [
  { langCode: 'ar', voiceId: 'Zeina' },
  { langCode: 'zh', voiceId: 'Zhiyu' },
  { langCode: 'zh-TW', voiceId: 'Zhiyu' },
  { langCode: 'en', voiceId: 'Joanna' },
  { langCode: 'de', voiceId: 'Hans' },
  { langCode: 'tr', voiceId: 'Filiz' },
];

export const getVoiceIdFromLangCode = (langCode) => {
  const speech = speechLanguages.find(lang => lang.langCode === langCode);
  return speech ? speech.voiceId : null;
};

export const speechText = params => new Promise((resolve, reject) => {
  polly.synthesizeSpeech(params, (err, response) => {
    if (err) {
      reject(err);
    } else {
      const stream = response.AudioStream;
      const uInt8Array = new Uint8Array(stream);
      const arrayBuffer = uInt8Array.buffer;
      const blob = new Blob([arrayBuffer]);

      const url = URL.createObjectURL(blob);
      resolve(new Audio(url));
    }
  });
});
