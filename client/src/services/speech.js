export const speechLanguages = [
  { langCode: 'ar', voiceId: 'Zeina' },
  { langCode: 'zh', voiceId: 'Zhiyu' },
  { langCode: 'zh-TW', voiceId: 'Zhiyu' },
  { langCode: 'da', voiceId: 'Mads' },
  { langCode: 'nl', voiceId: 'Ruben' },
  { langCode: 'en', voiceId: 'Joanna' },
  { langCode: 'fr', voiceId: 'Mathieu' },
  { langCode: 'de', voiceId: 'Hans' },
  { langCode: 'it', voiceId: 'Bianca' },
  { langCode: 'ja', voiceId: 'Mizuki' },
  { langCode: 'ko', voiceId: 'Seoyeon' },
  { langCode: 'pl', voiceId: 'Ewa' },
  { langCode: 'pt', voiceId: 'Cristiano' },
  { langCode: 'ru', voiceId: 'Tatyana' },
  { langCode: 'es', voiceId: 'Mia' },
  { langCode: 'sv', voiceId: 'Astrid' },
  { langCode: 'tr', voiceId: 'Filiz' },
];

export const getVoiceIdFromLangCode = (langCode) => {
  const speech = speechLanguages.find(lang => lang.langCode === langCode);
  return speech ? speech.voiceId : null;
};
