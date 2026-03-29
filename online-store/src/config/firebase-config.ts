// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage, connectStorageEmulator } from "firebase/storage";

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

// Local emulator support (set VITE_USE_FIREBASE_EMULATOR=true in .env to enable)
if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  // Auth emulator defaults to http://localhost:9099
  try {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  } catch (e) {
    // ignore if already connected in hot-reload
  }

  // Storage emulator defaults to localhost:9199
  try {
    connectStorageEmulator(storage, 'localhost', 9199);
  } catch (e) {
    // ignore if already connected in hot-reload
  }
}