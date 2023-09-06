// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyCWO7BxJzE9SLQ1tJQSEQVtcyshF3sN1z0",
  authDomain: "gerapix-7ff43.firebaseapp.com",
  databaseURL: "https://gerapix-7ff43-default-rtdb.firebaseio.com",
  projectId: "gerapix-7ff43",
  storageBucket: "gerapix-7ff43.appspot.com",
  messagingSenderId: "84025690935",
  appId: "1:84025690935:web:fecddb55181e3cac2628b2",
  measurementId: "G-KRE17JS9L2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // auth is now initialized
export const googleProvider = new GoogleAuthProvider(); // provider is now initialized
