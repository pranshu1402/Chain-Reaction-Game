import React from 'react';

const Navigation = () => {
	return (
		<nav>
			<ul className='nav-list'>
				<li>
					<a className='list-link' href='/history'>
						MATCHES
					</a>
				</li>
				<li>
					<a className='list-link' href='/about'>
						ABOUT
					</a>
				</li>
				<li>
					<a className='list-link' href='/rules'>
						RULES
					</a>
				</li>
				<li>
					<a className='list-link' href='/contact'>
						CONTACT
					</a>
				</li>
				<li>
					<a className='list-link' href='/auth'>
						LOGIN
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
