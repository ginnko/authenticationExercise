import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAeF0z5eWUHD5hOlB5j9kjEN6pwCKPcxJg",
  authDomain: "authentication-79be8.firebaseapp.com",
  databaseURL: "https://authentication-79be8.firebaseio.com",
  projectId: "authentication-79be8",
  storageBucket: "authentication-79be8.appspot.com",
  messagingSenderId: "749888699283"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {auth};