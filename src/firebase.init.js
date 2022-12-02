// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCa-IE1cUiRCVjGn4KR8Q1jgPW-BTCqXtg",
    authDomain: "onlinechessgame-50ffd.firebaseapp.com",
    projectId: "onlinechessgame-50ffd",
    storageBucket: "onlinechessgame-50ffd.appspot.com",
    messagingSenderId: "797163866014",
    appId: "1:797163866014:web:11ec369b8f62445cb3f88f",
    measurementId: "G-XWH8B0T26W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);