import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDw3ElXleoRiwp0yvaxQMNus_-JJZheOyM",
    authDomain: "e002-62098.firebaseapp.com",
    projectId: "e002-62098",
    storageBucket: "e002-62098.appspot.com",
    messagingSenderId: "389438030364",
    appId: "1:389438030364:web:2034274714a4ee5bd815d9",
    measurementId: "G-T8BGD1TS23"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
