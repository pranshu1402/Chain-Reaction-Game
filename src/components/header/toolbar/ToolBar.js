import Logo from '../Logo';
import DrawerToggle from '../sideDrawer/DrawerToggle';
import Navigation from '../Navigation';

const ToolBar = props => (
	<div className='header-toolbar'>
		<Logo />
		<div className='toolbar-navigation'>
			<Navigation />
		</div>
		<DrawerToggle
			onToggleClick={() => props.setOpenDrawer(!props.openDrawer)}
		/>
		{/* <Search/> */}
	</div>
);

export default ToolBar;
