import { Fragment, useEffect } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './Layout.css';
import firebaseApp from '../../config/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { authStart } from '../auth/authActions';
import { useHistory } from 'react-router';

const Layout = props => {
	const { redirectTo } = useSelector(store => store.auth);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const auth = getAuth(firebaseApp);
		onAuthStateChanged(auth, result => {
			if (result) {
				history.replace(redirectTo);
			}
			dispatch(authStart(result));
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Fragment>
			<Header />
			<main>{props.children}</main>
			<Footer />
		</Fragment>
	);
};

export default Layout;
