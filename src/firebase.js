import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyB4hl9a1RPB_MmuqPm_zNmO49Y20qSf9e4",
    authDomain: "stoked-sun-304807.firebaseapp.com",
    projectId: "stoked-sun-304807",
    storageBucket: "stoked-sun-304807.appspot.com",
    messagingSenderId: "622344556987",
    appId: "1:622344556987:web:2018a94371c8eeef90f49e",
    measurementId: "G-9WXYEFVCQ0"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const fv = firebase.firestore.FieldValue;