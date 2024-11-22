import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";  // Import for database
import { getStorage } from "firebase/storage";  // Import for storage

const firebaseConfig = {
  apiKey: "AIzaSyCMpg7uxlN9TwIIKgQQAxTwB_WHeCpkd0o",
  authDomain: "tyedi-fa18f.firebaseapp.com",
  projectId: "tyedi-fa18f",
  storageBucket: "tyedi-fa18f.firebasestorage.app",
  messagingSenderId: "702953448240",
  appId: "1:702953448240:web:fe37f44809d00f74701ef5",
  databaseURL: "https://tyedi-fa18f-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);  // Export the database instance
export const storage = getStorage(app);  // Export the storage instance
