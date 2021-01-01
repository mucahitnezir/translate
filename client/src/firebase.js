import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';

const app = firebase.initializeApp({
  apiKey: process.env.VUE_APP_FB_API_KEY,
  projectId: process.env.VUE_APP_FB_PROJECT_ID,
});

const myAuth = app.auth();
myAuth.getCurrentUser = () => new Promise((resolve) => {
  const unsubscribe = myAuth.onAuthStateChanged((user) => {
    resolve(user);
    unsubscribe();
  });
});

export const auth = myAuth;

export const functions = app.functions('europe-west3');
