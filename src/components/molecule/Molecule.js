import React from 'react';
import Atom from './Atom';
// import ShootAtom from './ShootAtom';
import Spin from 'react-reveal/Spin';
import './Molecule.css';

const getAtoms = (count, color, moleculeId, directions) => {
	const atoms = [];
	let counter = 0;
	while (counter < count) {
		const key = `${directions ? 'shoot' : ''}${moleculeId}${counter}`;
		let direction;
		if (directions) {
			direction = directions ? directions[counter] : '';
		}

		atoms.push(
			<Atom key={key} color={color} atomId={key} shootDirection={direction} />
		);

		counter++;
	}

	return atoms;
};

const getSphereComponent = props => {
	const { sphereCount, color, isBurstRequired, directions, moleculeId } = props;
	return isBurstRequired
		? getAtoms(sphereCount, color, moleculeId, directions)
		: getAtoms(sphereCount, color, moleculeId);
};

const Sphere = props => {
	const spheres = <div className='molecule'>{getSphereComponent(props)}</div>;

	return props.isBurstRequired ? (
		spheres
	) : (
		<Spin forever={true} duration={5000}>
			{spheres}
		</Spin>
	);
};

export default Sphere;
