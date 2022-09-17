// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm_2QDoJ69wMmKfqqnO-KEEVT9W8hS4zU",
  authDomain: "uorfinft-1f57e.firebaseapp.com",
  projectId: "uorfinft-1f57e",
  storageBucket: "uorfinft-1f57e.appspot.com",
  messagingSenderId: "135156237925",
  appId: "1:135156237925:web:cfe209d0c0e99e0e79688c",
  measurementId: "G-TS3EHB0Z2P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const authentication = getAuth(app);
