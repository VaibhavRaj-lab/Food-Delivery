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
  apiKey: "AIzaSyAgtYrZKoMYou-7VI60Fw9F-mJyBP5gHJo",
  authDomain: "foodapp-a63c7.firebaseapp.com",
  projectId: "foodapp-a63c7",
  storageBucket: "foodapp-a63c7.appspot.com",
  messagingSenderId: "903056459008",
  appId: "1:903056459008:web:fb332a35e066ecb69adfe5",
  measurementId: "G-BMPX9WBNDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app);
export default ref;
export const database = getDatabase(app)