import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics"; 
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"; 
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
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);

isSupported()
  .then(supported => {
    if (supported) {
      getAnalytics(app); 
      console.log("Firebase Analytics initialized successfully.");
    } else {
      console.log("Firebase Analytics skipped: Unsupported environment (likely React Native).");
    }
  })
  .catch(error => {
    console.error("Error checking Firebase Analytics support:", error);
  });

export { app };