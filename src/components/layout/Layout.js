import { Fragment, useEffect } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
// import { useDispatch, useSelector } from 'react-redux';
import './Layout.css';
// import firebase from '../auth/firebaseConfig';
// import { authStart } from '../auth/authActions';

const Layout = props => {
	// const { redirectTo } = useSelector(store => store.auth); /* state: user */
	// const dispatch = useDispatch();

	useEffect(() => {
		// firebase.auth().onAuthStateChanged(user => {
		// 	if (user) {
		// 		// User is signed in.
		// 		console.log('User is Authenticated');
		// 		dispatch(authStart());
		// 		redirectUser();
		// 	}
		// });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// function redirectUser(redirectUrl = redirectTo) {
	// 	props.history.replace(redirectUrl);
	// }

	return (
		<Fragment>
			<Header />
			<main>{props.children}</main>
			<Footer />
		</Fragment>
	);
};

export default Layout;
