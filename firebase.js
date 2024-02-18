import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiqhmFNo_Cc6SmaNzVkVxUJczc3L-g9zY",
  authDomain: "treehacks-4b26e.firebaseapp.com",
  projectId: "treehacks-4b26e",
  storageBucket: "treehacks-4b26e.appspot.com",
  messagingSenderId: "128089981929",
  appId: "1:128089981929:web:6508cce18c0ecc3ee2c178",
  measurementId: "G-LDKLDHE1R7",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
