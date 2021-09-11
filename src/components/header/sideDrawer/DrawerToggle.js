const DrawerToggle = props => (
	<button className='side-drawer-toggle' onClick={props.onToggleClick}>
		<span className='toggle-span'></span>
		<span className='toggle-span'></span>
		<span className='toggle-span'></span>
	</button>
);

export default DrawerToggle;
