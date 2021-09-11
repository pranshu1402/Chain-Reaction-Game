import { Fragment } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './Layout.css';

const Layout = props => (
	<Fragment>
		<Header />
		<main>{props.children}</main>
		<Footer />
	</Fragment>
);

export default Layout;
