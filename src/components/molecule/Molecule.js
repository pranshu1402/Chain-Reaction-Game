import React from 'react';
import Atom from './Atom';
// import ShootAtom from './ShootAtom';
import Spin from 'react-reveal/Spin';
import './Molecule.css';

const getAtoms = (count, color, moleculeId, directions) => {
	const atoms = [];
	if (directions) {
		console.log(directions);
		let counter = 0;
		while (counter < count) {
			atoms.push(
				<Atom
					color={color}
					atomId={`shoot${moleculeId}${counter}`}
					shootDirection={directions[counter]}
				/>
			);

			counter++;
		}
	} else {
		let counter = 0;
		while (counter++ < count) {
			atoms.push(<Atom color={color} atomId={`${moleculeId}${counter}`} />);
		}
	}

	return atoms;
};

const getSphereComponent = props => {
	const { sphereCount, color, isBurstRequired, directions, moleculeId } = props;
	switch (sphereCount) {
		case 1:
			return getAtoms(sphereCount, color);
		case 2:
			return isBurstRequired
				? getAtoms(sphereCount, color, moleculeId, directions)
				: getAtoms(sphereCount, color);
		case 3:
			return isBurstRequired
				? getAtoms(sphereCount, color, moleculeId, directions)
				: getAtoms(sphereCount, color);
		case 4:
			return getAtoms(sphereCount, color, moleculeId, directions);
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
