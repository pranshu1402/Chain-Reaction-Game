import firebase from '../../config/firebaseConfig';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider
} from 'firebase/auth';

const GoogleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();

const auth = getAuth();
auth.languageCode = 'en';

const initiateSignIn = async provider =>
	signInWithPopup(auth, provider)
		.then(res => ({
			token: provider.credentialFromResult(res).accessToken,
			user: res.user
		}))
		.catch(err => err);

export { GoogleProvider, FacebookProvider, initiateSignIn };

export default firebase;
