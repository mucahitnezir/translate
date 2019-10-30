import * as firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCrCAWGVLQQusq3nr6WzEKabwWttmmx-_8',
  authDomain: 'medixo-translate.firebaseapp.com',
  databaseURL: 'https://medixo-translate.firebaseio.com',
  projectId: 'medixo-translate',
  storageBucket: 'medixo-translate.appspot.com',
  messagingSenderId: '150309961932',
  appId: '1:150309961932:web:239f53917b4867f71c8269',
  measurementId: 'G-M01DWQDZF3',
});

export const auth = app.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
