// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5gagbnSj4nzWia_EUcghfNSDrSvy5TTE",
    authDomain: "e-commerce-119d5.firebaseapp.com",
    projectId: "e-commerce-119d5",
    storageBucket: "e-commerce-119d5.appspot.com",
    messagingSenderId: "339309853371",
    appId: "1:339309853371:web:004305c04788d5dbdf479e",
    measurementId: "G-3K2GGF723D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default analytics;