// firebaseConfig.js

// Import initializeApp from Firebase
import { initializeApp } from "firebase/app";

import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZRMH7I421he4M-oByaQg_FamA4N80UCg",
  authDomain: "degree-crud-app.firebaseapp.com",
  projectId: "degree-crud-app",
  storageBucket: "degree-crud-app.appspot.com",
  messagingSenderId: "1026123483325",
  appId: "1:1026123483325:web:bfd86883b54336b39acfd4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Export the Firebase services for use in your app
export { db, auth };
