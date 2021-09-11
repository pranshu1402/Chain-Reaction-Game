import firebase from '../../config/firebaseConfig';
import {
	getAuth,
	signInWithRedirect,
	GoogleAuthProvider,
	FacebookAuthProvider
} from 'firebase/auth';

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({
	display: 'popup'
});

const FacebookProvider = new FacebookAuthProvider();
FacebookProvider.setCustomParameters({
	display: 'popup'
});

const auth = getAuth();
auth.languageCode = 'en';

const initiateSignIn = async provider =>
	signInWithRedirect(auth, provider)
		.then(res => ({
			token: provider.credentialFromResult(res).accessToken,
			user: res.user
		}))
		.catch(err => err);

export { GoogleProvider, FacebookProvider, initiateSignIn };

export default firebase;
