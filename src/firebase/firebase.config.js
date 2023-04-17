// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBg6lnnpHcgRC6ZpF_if2zIEyKnwHu2G8w",
    authDomain: "email-password-auth-63ccf.firebaseapp.com",
    projectId: "email-password-auth-63ccf",
    storageBucket: "email-password-auth-63ccf.appspot.com",
    messagingSenderId: "1057659794307",
    appId: "1:1057659794307:web:f7cc00dd7cf07b9899bcb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;