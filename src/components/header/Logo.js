import { Link } from 'react-router-dom';

const Logo = () => (
	<div className='logo-container'>
		<Link to='/home' className='logo'>
			Chain Rx
		</Link>
	</div>
);

export default Logo;
