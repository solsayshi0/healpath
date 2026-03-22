import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDfZrPymoM9J3N6xe6VAGXv0AZM5VkGJ0k",
  authDomain: "healpath-101186.firebaseapp.com",
  projectId: "healpath-101186",
  storageBucket: "healpath-101186.firebasestorage.app",
  messagingSenderId: "1028684762567",
  appId: "1:1028684762567:web:3f20b33acffb9319eadde2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);