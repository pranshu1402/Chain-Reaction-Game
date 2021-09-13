import firebaseApp from '../../config/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

export const authStart = userData => {
	if (userData) {
		return authSuccess(userData);
	}

	return authFail('Please Sign In to continue');
};

export const authSuccess = user => {
	const userData = {
		accessToken: user.accessToken,
		name: user.displayName,
		email: user.email,
		emailVerified: user.emailVerified,
		photoURL: user.photoURL,
		isAnonymous: user.isAnonymous,
		uid: user.uid,
		providerData: user.providerData[0].providerId
	};

	const db = getFirestore(firebaseApp);
	setDoc(
		doc(db, 'users', userData.uid),
		{
			profile: {
				...userData
			}
		},
		{ merge: true }
	)
		.then(() => console.log('Profile Updated'))
		.catch();

	return {
		type: 'AUTH_SUCCESS',
		userData
	};
};

const authFail = error => {
	return {
		type: 'AUTH_FAIL',
		error: error
	};
};

export const authLogout = () => {
	getAuth(firebaseApp)
		.signOut()
		.then(function () {
			console.log(' Sign-out successful.');
		})
		.catch(error => console.log(error));

	return {
		type: 'AUTH_LOGOUT'
	};
};
