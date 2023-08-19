import {
	databaseRef,
	writeUserData,
	databaseOnValue,
	database,
} from './Database';

import {
	storageRef,
	storageGetURL,
	storageGetRef,
	storageUploadFyles,
} from './Storage';

import { onAuthStateChanged, signout, btnLogin } from './Auth';

// --------------------------------------------------------------

export {
	onAuthStateChanged,
	signout,
	btnLogin,
	databaseRef,
	writeUserData,
	databaseOnValue,
	storageRef,
	storageGetURL,
	storageGetRef,
	storageUploadFyles,
	database,
};
