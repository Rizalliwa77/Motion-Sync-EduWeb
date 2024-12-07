import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxGXe52PtB7YD9yGRjVoFNn3FVZLrNuqk",
  authDomain: "motion-sync-edumode.firebaseapp.com",
  projectId: "motion-sync-edumode",
  storageBucket: "motion-sync-edumode.appspot.com",
  messagingSenderId: "1071797681937",
  appId: "1:1071797681937:web:f0fe655c3f0d40a0da2357",
  measurementId: "G-J0JHEFC1K4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
