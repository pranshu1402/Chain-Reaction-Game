import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<nav>
			<ul className='nav-list'>
				{/* <li>
					<a className='list-link' href='/history'>
						MATCHES
					</a>
				</li> */}
				<li>
					<Link className='list-link' to='/help'>
						HELP
					</Link>
				</li>
				<li>
					<Link className='list-link' to='/support'>
						SUPPORT
					</Link>
				</li>
				{/* <li>
					<a className='list-link' href='/auth'>
						LOGIN
					</a>
				</li> */}
			</ul>
		</nav>
	);
};

export default Navigation;
