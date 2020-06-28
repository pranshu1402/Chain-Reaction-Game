import React from 'react';
import Logo from '../Logo';
import Navigation from '../Navigation';
import './SideDrawer.css';

const SideDrawer = props => {
	const sideDrawerClassName = `side-drawer-container ${[
		props.open ? 'open-drawer' : ''
	]}`;

	return (
		<div className={sideDrawerClassName}>
			<div className='side-drawer'>
				<Logo />
				<div className='side-drawer-navigation'>
					<Navigation onLinkClick={props.onCurtainClick} />
				</div>
			</div>
			<div className='side-drawer-curtain' onClick={props.onCurtainClick}></div>
		</div>
	);
};

export default SideDrawer;
