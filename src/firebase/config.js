// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAV1mYx3ZsIUvNiMFr1jAx3DhEJvFJwFY8",
    authDomain: "acatt-412907.firebaseapp.com",
    projectId: "acatt-412907",
    storageBucket: "acatt-412907.appspot.com",
    messagingSenderId: "792796894735",
    appId: "1:792796894735:web:76222cdfd37808761af57a",
    measurementId: "G-CBP24HKE50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getStorage(app)
