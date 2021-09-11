import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authLogout } from '../auth/authActions';

const Navigation = props => {
	const dispatch = useDispatch();
	const { user } = useSelector(store => store.auth);

	return (
		<nav>
			<ul className='nav-list'>
				{user ? (
					<li>
						<div className='greeting-banner'>👋 Hello {user.name}</div>
					</li>
				) : null}
				{/* <li>
					<a className='list-link' href='/history'>
						MATCHES
					</a>
				</li> */}
				<li>
					<Link className='list-link' to='/help' onClick={props.onLinkClick}>
						RULES
					</Link>
				</li>
				<li>
					<Link className='list-link' to='/support' onClick={props.onLinkClick}>
						SUPPORT
					</Link>
				</li>
				<li>
					{user ? (
						<Link
							className='list-link'
							to='/'
							onClick={() => dispatch(authLogout())}
						>
							LOGOUT
						</Link>
					) : (
						<Link className='list-link' to='/auth'>
							LOGIN
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
