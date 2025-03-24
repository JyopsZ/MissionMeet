const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");

const {

    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGE_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID

} = process.env;

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
  };

let app;
let firestoreDB;

const initializeFirebaseApp = () => {
    app = initializeApp(firebaseConfig);
    firestoreDB = getFirestore();
    return app;
};

const getFirebaseApp = () => app;

module.exports = {
    initializeFirebaseApp,
    getFirebaseApp
};


  // Reference: https://www.youtube.com/watch?v=sh7xiO7jnV0