const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

const auth = admin.auth();
const firestore = admin.firestore();

const awsConfig = functions.config().aws;
const { speechText, translateText } = require('./aws')(awsConfig);

/**
 * User Register Function
 */
exports.register = functions.region('europe-west3').https.onCall(async (data, context) => {
  // Get user data
  const { displayName, email, password } = data;

  // Create user
  const user = await auth.createUser({ displayName, email, password })
    .catch((err) => {
      throw new functions.https.HttpsError('unknown', err.message);
    });

  // Save it to firestore
  await firestore.collection('users').doc(user.uid)
    .set({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    })
    .catch(async (err) => {
      await auth.deleteUser(user.uid);
      throw new functions.https.HttpsError('unknown', err.message);
    });

  return {
    uid: user.uid
  }
});

/**
 * Translate Function
 */
exports.translate = functions.region('europe-west3').https.onCall(async (data, context) => {
  const { sourceLangCode, targetLangCode, text } = data;
  // Validate incoming data
  if (typeof text !== 'string' || !text.trim() || text.length > 100) {
    throw new functions.https.HttpsError('invalid-argument', 'Please provide a valid text.');
  }

  // Firstly, try to find it on the firestore
  const querySnapshot = await firestore.collection('translations')
    .where('sourceText', '==', text)
    .where('sourceLangCode.translated', '==', sourceLangCode)
    .where('targetLangCode', '==', targetLangCode)
    .limit(1)
    .get();

  if (querySnapshot.docs.length >= 1) {
    const documentData = querySnapshot.docs[0].data();
    return {
      sourceLangCode: documentData.sourceLangCode.translated,
      translatedText: documentData.targetText,
    }
  }

  // If there is no firestore, then find it with aws translate api
  const params = {
    SourceLanguageCode: sourceLangCode,
    TargetLanguageCode: targetLangCode,
    Text: text,
  };
  return translateText(params)
    .then((response) => {
      // Save the translation to the firestore
      firestore.collection('translations').add({
        sourceLangCode: {
          original: sourceLangCode,
          translated: response.SourceLanguageCode,
        },
        targetLangCode,
        sourceText: text,
        targetText: response.TranslatedText,
        userId: context.auth ? context.auth.uid : null,
        translationSource: 'aws',
        createdAt: admin.firestore.Timestamp.now(),
      });
      // Return response
      return {
        sourceLangCode: response.SourceLanguageCode,
        translatedText: response.TranslatedText,
      }
    })
    .catch((err) => {
      throw new functions.https.HttpsError('unknown', err.message);
    });
});


/**
 * Speech Text Function
 */
exports.speechText = functions.region('europe-west3').https.onCall((data, context) => {
  const { voiceId, text } = data;
  const params = {
    OutputFormat: 'mp3',
    Text: text,
    TextType: 'text',
    VoiceId: voiceId,
  };
  return speechText(params)
    .catch((err) => {
      throw new functions.https.HttpsError('unknown', err.message);
    });
});
