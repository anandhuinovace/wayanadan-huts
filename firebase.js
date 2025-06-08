import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCA5c1rEy9JfogzZiwGUFpjjcxwqPsns0",
  authDomain: "wayanadanhuts-88049.firebaseapp.com",
  projectId: "wayanadanhuts-88049",
  storageBucket: "wayanadanhuts-88049.firebasestorage.app",
  messagingSenderId: "317392479987",
  appId: "1:317392479987:web:e7926eaf97bbab82683986",
  measurementId: "G-3JSW75FVB0"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
