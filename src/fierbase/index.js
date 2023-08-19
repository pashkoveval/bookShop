// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';

import { getDatabase } from 'firebase/database';

import { getStorage } from 'firebase/storage';

import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBgZ-3csL27Aarb4y3Z-Mi2UbG5Wp7iUD4',
	authDomain: 'bookshop-365d4.firebaseapp.com',
	projectId: 'bookshop-365d4',
	storageBucket: 'bookshop-365d4.appspot.com',
	messagingSenderId: '191764215781',
	appId: '1:191764215781:web:111446f4d4f336dfec210c',
	measurementId: 'G-25KGC0LPJN',
	databaseURL:
		'https://bookshop-365d4-default-rtdb.europe-west1.firebasedatabase.app',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const firebaseApp = getApp();
const storage = getStorage(firebaseApp);

export { app, analytics, db, auth, provider, firebaseApp, storage };
