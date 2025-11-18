// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAA4u7l_S08IqctzTl0mGQkUb8GcOlD5I",
  authDomain: "reactnativeapp-d00f0.firebaseapp.com",
  projectId: "reactnativeapp-d00f0",
  storageBucket: "reactnativeapp-d00f0.firebasestorage.app",
  messagingSenderId: "491962424186",
  appId: "1:491962424186:web:f72516d7d7afd4ff4914c3",
  measurementId: "G-LQJJVFWXBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);