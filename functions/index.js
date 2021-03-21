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
  const photoURL = 'https://firebasestorage.googleapis.com/v0/b/translate-app-989a3.appspot.com/o/default_profile_400x400.png?alt=media';
  const user = await auth.createUser({ displayName, email, password, photoURL })
    .catch((err) => {
      throw new functions.https.HttpsError('unknown', err.message);
    });

  // Save it to firestore
  await firestore.collection('users').doc(user.uid)
    .set({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
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
  if (sourceLangCode !== 'auto') {
    // TODO: Migrate to algolia search
    const querySnapshot = await firestore.collection('translations')
      .where('sourceText', '==', text)
      .where('sourceLangCode.translated', '==', sourceLangCode)
      .where('targetLangCode', '==', targetLangCode)
      .limit(1)
      .get();

    if (querySnapshot.docs.length >= 1) {
      const documentData = querySnapshot.docs[0].data();
      // Save the translation to user history
      if (context.auth) {
        const { uid } = context.auth;
        await firestore.collection('users').doc(uid).collection('translations')
          .add({ ...documentData, createdAt: admin.firestore.Timestamp.now() });
      }
      return {
        sourceLangCode: documentData.sourceLangCode.translated,
        translatedText: documentData.targetText,
      }
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
      // Save translation
      const payload = {
        sourceLangCode: {
          original: sourceLangCode,
          translated: response.SourceLanguageCode,
        },
        targetLangCode,
        sourceText: text,
        targetText: response.TranslatedText,
        translationSource: 'aws',
        createdAt: admin.firestore.Timestamp.now(),
      };
      // Save the translation to firestore
      firestore.collection('translations').add(payload);
      // Save the translation to user history
      if (context.auth) {
        const { uid } = context.auth;
        firestore.collection('users').doc(uid).collection('translations')
          .add(payload);
      }
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


/**
 * On User Delete
 */
exports.onUserDelete = functions.region('europe-west3').auth.user().onDelete(async (user) => {
  const { uid } = user;

  await firestore.collection('users').doc(uid).delete()
    .catch(() => {
      return false;
    });

  return true;
});
