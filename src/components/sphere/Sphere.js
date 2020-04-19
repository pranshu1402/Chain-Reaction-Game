import React from 'react';
import MonoSphere from './types/MonoSphere';
import DuoSphere from './types/DuoSphere';
import TrioSphere from './types/TrioSphere';
import './Sphere.css';

const getSphereComponent = count => {
	switch (count) {
		case 1:
			return <MonoSphere />;
		case 2:
			return <DuoSphere />;
		case 3:
			return <TrioSphere />;
		default:
			return '';
	}
};
const Sphere = props => {
	return (
		<div className='molecule'>
			{/* Functionalities of spheres */}
			{/* 1.On click => 
				a. Do nothing if player color not matching
				b. Update & split count if color matches */}
			{getSphereComponent(props.sphereCount)}
		</div>
	);
};

export default Sphere;
