
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage, ref} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyD7a7MQUHPin3ENt2sy-ZTloJf3A1wabL0",
	authDomain: "photogallery-bc9d2.firebaseapp.com",
	projectId: "photogallery-bc9d2",
	storageBucket: "photogallery-bc9d2.appspot.com",
	messagingSenderId: "122911408378",
	appId: "1:122911408378:web:f8222bcfe65f2797524943"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const projectStorage = getStorage(app);