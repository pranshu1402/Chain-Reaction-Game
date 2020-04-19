import React, { useState } from 'react';
// import DrawerToggle from './sideDrawer/DrawerToggle';
import ToolBar from './toolbar/ToolBar';
import SideDrawer from './sideDrawer/SideDrawer';
// import Logo from './Logo';
import './Header.css';

const Header = () => {
	const [openDrawer, setOpenDrawer] = useState(false);

	return (
		<div className='app-header'>
			<ToolBar setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />

			<SideDrawer
				open={openDrawer}
				onCurtainClick={() => setOpenDrawer(!openDrawer)}
			/>
		</div>
	);
};

export default Header;
