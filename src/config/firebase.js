// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHpSHuMBM6jZp-3LtLNuPUe5RyCn7CySM",
  authDomain: "student-management-c2fb4.firebaseapp.com",
  projectId: "student-management-c2fb4",
  storageBucket: "student-management-c2fb4.appspot.com",
  messagingSenderId: "33950476616",
  appId: "1:33950476616:web:fa8ddb335df3459f4eab7d",
  measurementId: "G-W8SHVX9SEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
export { storage, googleProvider };