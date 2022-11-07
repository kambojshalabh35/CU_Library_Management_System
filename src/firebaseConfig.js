import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyBGXr9Ws-TDliaFFNb3lKZfP9_90oSQIlM",
	authDomain: "cu-library-management.firebaseapp.com",
	projectId: "cu-library-management",
	storageBucket: "cu-library-management.appspot.com",
	messagingSenderId: "1076390461377",
	appId: "1:1076390461377:web:4db98c2e662e6471db3940",
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
