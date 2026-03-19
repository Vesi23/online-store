// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtBJvydOcpJJQNPmhT9MsOR7ZQSBfKmhs",
  authDomain: "albayrakeood-3119c.firebaseapp.com",
  projectId: "albayrakeood-3119c",
  // Use the Storage bucket host (usually <projectId>.appspot.com)
  // Correct format is usually '<projectId>.appspot.com'
  storageBucket: "albayrakeood-3119c.appspot.com",
  messagingSenderId: "332532991471",
  appId: "1:332532991471:web:a06d80e2a16bcc04f1221a",
  measurementId: "G-ZLR4X8NR8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);