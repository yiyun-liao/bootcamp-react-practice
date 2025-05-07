// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, setDoc, collection, getDocs, getDoc, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, where, limit, orderBy, serverTimestamp} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf-ckEFzTTpy0BJmSwUFAAkP9TfDJ-g3U",
  authDomain: "bootcamp-react-practice.firebaseapp.com",
  projectId: "bootcamp-react-practice",
  storageBucket: "bootcamp-react-practice.firebasestorage.app",
  messagingSenderId: "229726959173",
  appId: "1:229726959173:web:4da13b147b61d864c5152c",
  measurementId: "G-W8CZRTW5XT"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getAnalytics(app);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, setDoc, collection, getDocs, getDoc, addDoc, deleteDoc, doc, updateDoc, onSnapshot,query, where, limit, orderBy, serverTimestamp };