import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
	return (
		<div className='logo-container'>
			<Link to='/home' className='logo'>
				Chain Rx
			</Link>
		</div>
	);
};

export default Logo;
