import * as firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
});

export const auth = app.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
