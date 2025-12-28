import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

/**
 * Firebase Configuration (Security Notice)
 *
 * IMPORTANT:
 * API keys and project credentials are NOT hard-coded in this repository.
 *
 * All sensitive values are stored in environment variables
 * (VITE_FIREBASE_*) to prevent accidental exposure in public commits,
 * forks, screenshots, or build artifacts.
 *
 * This project intentionally loads Firebase config values from
 * import.meta.env to follow security-aware development practices.
 *
 * If you are running this project locally,
 * create a .env file and define the required values there.
 */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);
const db = getFirestore(app);

export { auth, db, storage, firestore };

