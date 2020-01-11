import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
});

const myAuth = app.auth();
myAuth.getCurrentUser = () => new Promise((resolve) => {
  const unsubscribe = myAuth.onAuthStateChanged((user) => {
    resolve(user);
    unsubscribe();
  });
});

// eslint-disable-next-line import/prefer-default-export
export const auth = myAuth;
