import React from 'react';
import Atom from './Atom';
import Spin from 'react-reveal/Spin';
import './Molecule.css';

const getSphereComponent = (count, color) => {
	switch (count) {
		case 1:
			return <Atom color={color} />;
		case 2:
			return (
				<React.Fragment>
					<Atom color={color} />
					<Atom color={color} />
				</React.Fragment>
			);
		case 3:
			return (
				<React.Fragment>
					<Atom color={color} />
					<Atom color={color} />
					<Atom color={color} />
				</React.Fragment>
			);
		default:
			return '';
	}
};
const Sphere = props => {
	return (
		<Spin forever={true} duration={5000}>
			<div className='molecule'>
				{/* Functionalities of spheres */}
				{/* 1.On click => 
				a. Do nothing if player color not matching
				b. Update & split count if color matches */}
				{getSphereComponent(props.sphereCount, props.color)}
			</div>
		</Spin>
	);
};

export default Sphere;
