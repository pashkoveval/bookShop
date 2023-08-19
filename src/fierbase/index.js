// Import the functions you need from the SDKs you need
import { v4 as genId } from 'uuid';
import { initializeApp, getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';

import {
	ref as storageRef,
	getStorage,
	getDownloadURL,
	uploadBytesResumable,
} from 'firebase/storage';

import {
	getAuth,
	signOut,
	updateProfile,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth';

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

const writeUserData = (uid, user) => {
	set(ref(db, '/users/' + uid), user);
};

const getURL = async (pathImg) => {
	return await getDownloadURL(storageRef(storage, pathImg))
		.then((url) => {
			return url;
		})
		.catch((error) => {
			console.error(error);
		});
};

const getRefFunc = (pathImg = 'img') => {
	return storageRef(storage, pathImg);
};

const uploadFyles = async (file) => {
	if (file) {
		const metadata = {
			contentType: file.type,
		};
		const storageRefText = storageRef(storage, 'images/' + genId());
		const uploadTask = await uploadBytesResumable(
			storageRefText,
			file,
			metadata
		);
		if (uploadTask) {
			const url = await getDownloadURL(storageRefText).then((downloadURL) => {
				return downloadURL;
			});

			console.log('url', url);
			return url;
		}
	}
};

onAuthStateChanged(auth, (user) => {
	if (user) {
		const userData = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			// localId: user?.reloadUserInfo?.localId,
		};
		writeUserData(userData.uid, userData);
		console.log('auth', user);
		console.log('userData', userData);
	} else {
		console.log('not auth');
	}
});

const signout = async () => {
	await signOut(auth)
		.then(() => {
			console.log('signout');
		})
		.catch((error) => {
			console.error(error);
		});
};

const btnLogin = async () => {
	return await signInWithPopup(auth, provider)
		.then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			const user = result.user;
			return { token, user };
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.customData?.email;
			const credential = GoogleAuthProvider.credentialFromError(error);
			console.error({ errorCode, errorMessage, email, credential });
		});
};

export {
	getURL,
	getRefFunc,
	onAuthStateChanged,
	uploadFyles,
	btnLogin,
	signout,
	db,
	onValue,
	ref as fbref,
	analytics,
	writeUserData,
};
