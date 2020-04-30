import React from 'react';
import Atom from './Atom';
import ShootAtom from './ShootAtom';
import Spin from 'react-reveal/Spin';
import './Molecule.css';

const getSphereComponent = props => {
	const { sphereCount, color, isBurstRequired, directions } = props;
	switch (sphereCount) {
		case 1:
			return <Atom color={color} />;
		case 2:
			return isBurstRequired ? (
				<React.Fragment>
					<ShootAtom color={color} shootDirection={directions[0]} />
					<ShootAtom color={color} shootDirection={directions[1]} />
				</React.Fragment>
			) : (
				<React.Fragment>
					<Atom color={color} />
					<Atom color={color} />
				</React.Fragment>
			);
		case 3:
			return isBurstRequired ? (
				<React.Fragment>
					<ShootAtom color={color} shootDirection={directions[0]} />
					<ShootAtom color={color} shootDirection={directions[1]} />
					<ShootAtom color={color} shootDirection={directions[2]} />
				</React.Fragment>
			) : (
				<React.Fragment>
					<Atom color={color} />
					<Atom color={color} />
					<Atom color={color} />
				</React.Fragment>
			);
		case 4:
			return isBurstRequired ? (
				<React.Fragment>
					<ShootAtom color={color} shootDirection={directions[0]} />
					<ShootAtom color={color} shootDirection={directions[1]} />
					<ShootAtom color={color} shootDirection={directions[2]} />
					<ShootAtom color={color} shootDirection={directions[3]} />
				</React.Fragment>
			) : (
				''
			);
		default:
			return '';
	}
};

const Sphere = props => {
	const spheres = (
		<div className='molecule'>
			{/* Functionalities of spheres */}
			{/* 1.On click => 
				a. Do nothing if player color not matching
				b. Update & split count if color matches */}
			{getSphereComponent(props)}
		</div>
	);
	return props.isBurstRequired ? (
		spheres
	) : (
		<Spin forever={true} duration={5000}>
			{spheres}
		</Spin>
	);
};

export default Sphere;
