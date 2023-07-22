import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  databaseURL:
    "https://brim-mobile-default-rtdb.europe-west1.firebasedatabase.app",
  appId: "1:374318773989:web:b43eb810131502bb75860c",
  apiKey: "process.env.EXPO_PUBLIC_WEB_FIREBASE_API_KEY",
  authDomain: "brim-mobile.firebaseapp.com",
  storageBucket: "brim-mobile.appspot.com",
  messagingSenderId: "374318773989",
  measurementId: "G-JXZ56SQTRM",
  projectId: "brim-mobile",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);