import * as firebase from 'firebase';

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

export const auth = myAuth;
export const googleProvider = new firebase.auth.GoogleAuthProvider();
