import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAkUVom2AGfTCEmJPlv5Eyf5ap8f1jA0u8",
  authDomain: "fir-2-15cf8.firebaseapp.com",
  projectId: "fir-2-15cf8",
  storageBucket: "fir-2-15cf8.appspot.com",
  messagingSenderId: "740784486015",
  appId: "1:740784486015:web:83173abcbc582b2b1ff14a",
  measurementId: "G-CL1E7SH3GH",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;
