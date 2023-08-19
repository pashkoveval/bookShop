import { ref, set, onValue, push, update } from 'firebase/database';
import { db } from './index';

// _________________________________________________________

const writeUserData = (uid, user) => {
	set(ref(db, '/users/' + uid), user);
};

export {
	ref as databaseRef,
	onValue as databaseOnValue,
	db as database,
	writeUserData,
};
