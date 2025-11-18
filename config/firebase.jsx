import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAA4u7l_S08IqctzTl0mGQkUb8GcOlD5I",
  authDomain: "reactnativeapp-d00f0.firebaseapp.com",
  projectId: "reactnativeapp-d00f0",
  storageBucket: "reactnativeapp-d00f0.firebasestorage.app",
  messagingSenderId: "491962424186",
  appId: "1:491962424186:web:f72516d7d7afd4ff4914c3",
  measurementId: "G-LQJJVFWXBZ"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
