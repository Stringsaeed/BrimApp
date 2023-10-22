import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

import { config } from "config/env";

const firebaseConfig = {
  databaseURL:
    "https://brim-mobile-default-rtdb.europe-west1.firebasedatabase.app",
  appId: "1:374318773989:web:b43eb810131502bb75860c",
  authDomain: "brim-mobile.firebaseapp.com",
  storageBucket: "brim-mobile.appspot.com",
  messagingSenderId: "374318773989",
  apiKey: config.webFirebaseApiKey,
  measurementId: "G-JXZ56SQTRM",
  projectId: "brim-mobile",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
