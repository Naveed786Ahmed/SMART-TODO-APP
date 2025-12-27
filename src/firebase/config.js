import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { getDatabase} from "firebase/database";

const firebaseConfig = {
    // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    // appId: import.meta.env.VITE_FIREBASE_APP_ID,

    apiKey: "AIzaSyDzAohWx3FTPBdNjGZnTr8K8cirPGbw5KA",
    authDomain: "smart-todo-app-8e789.firebaseapp.com",
    projectId: "smart-todo-app-8e789",
    storageBucket: "smart-todo-app-8e789.firebasestorage.app",
    messagingSenderId: "648880312010",
    appId: "1:648880312010:web:efe933b4006a2cc8b3ee33",


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {
    auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut 
}
