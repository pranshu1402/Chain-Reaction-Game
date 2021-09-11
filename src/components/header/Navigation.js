import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authLogout } from '../auth/authActions';

const Navigation = props => {
	const dispatch = useDispatch();
	const { user } = useSelector(store => store.auth);

	return (
		<nav>
			<ul className='nav-list'>
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
						<button
							className='list-link'
							onClick={() => dispatch(authLogout())}
						>
							LOGOUT
						</button>
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
