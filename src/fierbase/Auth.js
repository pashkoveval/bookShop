import {
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
} from 'firebase/auth';

import { auth, provider } from './index';
import { writeUserData } from './Database';
//_______________________________________________________________

onAuthStateChanged(auth, (user) => {
	if (user) {
		const userData = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			localId: user?.reloadUserInfo?.localId,
			online: true,
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

export { onAuthStateChanged, signout, btnLogin };
