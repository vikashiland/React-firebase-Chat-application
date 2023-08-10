// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDjmYW1HOuf0aVtYuITuxd4My6BMjejjKY",
  authDomain: "react-chat-fc73c.firebaseapp.com",
  projectId: "react-chat-fc73c",
  storageBucket: "react-chat-fc73c.appspot.com",
  messagingSenderId: "792706299453",
  appId: "1:792706299453:web:b6430fcb8c59680cd4dc54"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);

export default app;