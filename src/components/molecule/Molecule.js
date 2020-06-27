import React from 'react';
import Atom from './Atom';
// import ShootAtom from './ShootAtom';
import Spin from 'react-reveal/Spin';
import './Molecule.css';

const getAtoms = (count, color, moleculeId, directions) => {
	const atoms = [];
	if (directions) {
		let counter = 0;
		while (counter < count) {
			atoms.push(
				<Atom
					key={`shoot${moleculeId}${counter}`}
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
			atoms.push(
				<Atom
					key={`${moleculeId}${counter}`}
					color={color}
					atomId={`${moleculeId}${counter}`}
				/>
			);
		}
	}

	return atoms;
};

const getSphereComponent = props => {
	const { sphereCount, color, isBurstRequired, directions, moleculeId } = props;
	switch (sphereCount) {
		case 1:
			return getAtoms(sphereCount, color, moleculeId);
		case 2:
			return isBurstRequired
				? getAtoms(sphereCount, color, moleculeId, directions)
				: getAtoms(sphereCount, color, moleculeId);
		case 3:
			return isBurstRequired
				? getAtoms(sphereCount, color, moleculeId, directions)
				: getAtoms(sphereCount, color, moleculeId);
		case 4:
			return getAtoms(sphereCount, color, moleculeId, directions);
		default:
			return '';
	}
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
