import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, setDoc, deleteDoc, query, orderBy,updateDoc } from 'firebase/firestore/lite';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBfeKpoT6Lub-tAS9P51BZ57U72L7EDX44",
    authDomain: "steam-aria-125217.firebaseapp.com",
    databaseURL: "https://steam-aria-125217.firebaseio.com",
    projectId: "steam-aria-125217",
    storageBucket: "steam-aria-125217.appspot.com",
    messagingSenderId: "162315251170",
    appId: "1:162315251170:web:609e9ef0ee84b8c5589dbb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, collection, getDocs, query, orderBy, setDoc, doc,updateDoc };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
