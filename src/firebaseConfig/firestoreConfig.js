
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {collection, getFirestore} from "firebase/firestore";
import {firebaseConfig} from "./settings";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const projectStorage = getStorage(app);
export const projectFirestore = getFirestore(app);

export const userFirestoreRef = collection(projectFirestore, 'users');

export const provider = new GoogleAuthProvider();
export const auth = getAuth();

