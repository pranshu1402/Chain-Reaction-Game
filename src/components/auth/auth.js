import './auth.css';
import Modal from '../ui/modal/Modal';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	GoogleProvider,
	FacebookProvider,
	initiateSignIn
} from './firebaseConfig';
import { authSuccess } from './authActions';

const Auth = ({ history }) => {
	const [open, setOpen] = useState(true);
	const { user, redirectTo } = useSelector(store => store.auth);
	const dispatch = useDispatch();

	function handleClose() {
		setOpen(false);
		history.goBack();
	}

	async function handleSignIn(e, provider) {
		e.preventDefault();
		const { user, token } = await initiateSignIn(provider);
		console.log(user, token);
		// dispatch(authSuccess());
		// history.replace(redirectTo);
	}

	return (
		<Modal
			shouldOpen={!user && open}
			handleModalClose={handleClose}
			heading='LOG IN'
		>
			<div className='auth-controls'>
				<button onClick={e => handleSignIn(e, GoogleProvider)}>
					Sign in with Google
				</button>
				<button onClick={e => handleSignIn(e, FacebookProvider)}>
					Sign in with Facebook
				</button>
			</div>
		</Modal>
	);
};

/* onLoginComplete: () => dispatch(actions.authSuccess()) */

export default Auth;
