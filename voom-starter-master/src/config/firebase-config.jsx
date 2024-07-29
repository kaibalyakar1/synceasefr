// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkjk5A5b2t9P4TjTjWqmURbUhW1BGyxHk",
  authDomain: "syncease-a6c46.firebaseapp.com",
  projectId: "syncease-a6c46",
  storageBucket: "syncease-a6c46.appspot.com",
  messagingSenderId: "307803944907",
  appId: "1:307803944907:web:1805cb7691250eacf2684e",
  measurementId: "G-NG94GTW86Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
