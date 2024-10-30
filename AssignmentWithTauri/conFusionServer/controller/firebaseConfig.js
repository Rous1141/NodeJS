// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy9TQXmsD3C-YBCkFTu7EAcY3xO_j76cY",
  authDomain: "sdnass.firebaseapp.com",
  projectId: "sdnass",
  storageBucket: "sdnass.appspot.com",
  messagingSenderId: "527309226582",
  appId: "1:527309226582:web:69912ef03a5863f2f471f7",
  measurementId: "G-FVXLWN6RYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);