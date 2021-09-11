import './auth.css';
import Modal from '../ui/modal/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import firebaseApp from '../../config/firebaseConfig';
import {
	getAuth,
	signInWithRedirect,
	GoogleAuthProvider,
	FacebookAuthProvider
} from 'firebase/auth';

const Auth = ({ history }) => {
	const [open, setOpen] = useState(true);
	const { user } = useSelector(store => store.auth);

	function handleClose() {
		setOpen(false);
		history.goBack();
	}

	const triggerSignInProvider = (event, provider) => {
		event.preventDefault();
		const auth = getAuth(firebaseApp);
		signInWithRedirect(auth, new provider()).catch(err => err);
	};

	return (
		<Modal
			shouldOpen={!user && open}
			handleModalClose={handleClose}
			heading='LOG IN'
		>
			<div className='auth-container'>
				<button
					className='auth-control'
					onClick={e => triggerSignInProvider(e, GoogleAuthProvider)}
				>
					Sign in with Google
				</button>
				<button
					className='auth-control'
					onClick={e => triggerSignInProvider(e, FacebookAuthProvider)}
				>
					Sign in with Facebook
				</button>
			</div>
		</Modal>
	);
};

export default Auth;
