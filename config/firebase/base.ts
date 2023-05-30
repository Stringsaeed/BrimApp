import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCKmT1W_dvlZhJ9BkoEZHyANI4T0pWPxeo",
  authDomain: "brim-mobile.firebaseapp.com",
  databaseURL:
    "https://brim-mobile-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "brim-mobile",
  storageBucket: "brim-mobile.appspot.com",
  messagingSenderId: "374318773989",
  appId: "1:374318773989:web:b43eb810131502bb75860c",
  measurementId: "G-JXZ56SQTRM",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
