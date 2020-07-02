import React, { useEffect, useRef } from 'react';

const Atom = props => {
	const atom = useRef(null);
	const shootDirection = props.shootDirection;

	useEffect(() => {
		if (shootDirection) {
			console.log(atom);
			atom.current.classList.add(`-${shootDirection.direction}`);
		}
	}, [shootDirection]);

	return (
		<span
			id={props.atomId}
			ref={atom}
			className={`atom ${props.shootDirection ? 'shoot' : ''}`}
			style={{ backgroundColor: props.color }}
		></span>
	);
};

export default Atom;
