import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiHAiG3pJI2fti-y9ATiMFKt35Cd1XSR8",
  authDomain: "fir-auth-cc696.firebaseapp.com",
  projectId: "fir-auth-cc696",
  storageBucket: "fir-auth-cc696.appspot.com",
  messagingSenderId: "293590321595",
  appId: "1:293590321595:web:e6486fde195da297cd9c9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);