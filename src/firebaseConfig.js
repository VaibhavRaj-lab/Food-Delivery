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
  apiKey: "AIzaSyCeU0gIZI9Fv1nF7zn0MeOST3FyoSClKmA",
  authDomain: "food-deli-129fe.firebaseapp.com",
  databaseURL: "https://food-deli-129fe-default-rtdb.firebaseio.com",
  projectId: "food-deli-129fe",
  storageBucket: "food-deli-129fe.appspot.com",
  messagingSenderId: "220910747897",
  appId: "1:220910747897:web:229b2fd5ebe416be896228",
  measurementId: "G-4V2NNDZETH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app);
export default ref;
export const database = getDatabase(app)