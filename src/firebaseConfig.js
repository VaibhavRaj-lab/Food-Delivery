// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase, ref } from "firebase/database"
// add firebase config here
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJCt5ZvI35DjWbF8LpZhnqgsz1U1aWqC0",
  authDomain: "fooddelivery-155ba.firebaseapp.com",
  projectId: "fooddelivery-155ba",
  storageBucket: "fooddelivery-155ba.appspot.com",
  messagingSenderId: "1031511503898",
  appId: "1:1031511503898:web:16a36dfa8453516fe48da3",
  measurementId: "G-L3ED7SRGGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app);
export default ref;
export const database = getDatabase(app)